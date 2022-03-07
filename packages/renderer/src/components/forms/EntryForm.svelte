<script lang="ts">
  import {
    DatePicker,
    DatePickerInput,
    Dropdown,
    FormGroup,
    NumberInput,
    TextInput,
    Toggle,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import Autocomplete from "../Autocomplete.svelte";
  import ipc from "/@/services/ipcService";
  import { formatDate, simplifyDate } from "/@/services/util";
  import type Client from "/type/database/Client";

  import type Entry from "/type/database/Entry";
  import type User from "/type/database/User";
  import type id from "/type/util/Id";
  let clients: Client[] = [];
  let selectedClientIndex = 0;

  function formatDropdownList(list: any[]) {
    let l = [];
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      l.push({
        id: element.id,
        text: element.name,
      });
    }
    return l;
  }

  export let id: id;
  let users: User[] = [];
  let selectedUserIndex = 0;

  export const submit = () => {
    let entry: Entry = {
      clientID: clientID,
      date: simplifyDate(date),
      hours: hours,
      text: text,
      userID: userID,
      fixedAmount: fixedAmount,
      fixcostText: fixcostText,
      id: defaultEntry.id != null ? defaultEntry.id : null,
    };
    console.log("entry", entry);
    if (entry.id) {
      ipc.invoke("updateEntry", entry);
    } else {
      ipc.invoke("addEntry", entry);
    }
  };

  export let isValid = false;
  function validate() {
    let isValidFixed = isFixed ? fixedAmount != null : true;
    console.log("DEBUG");
    console.log("client", clientID);
    console.log("date", date);
    console.log("hours", hours);
    console.log("userID", userID);
    console.log("text", text);
    console.log("isValidFixed", isValidFixed);

    isValid =
      clientID != null &&
      date.length > 0 &&
      hours >= 0 &&
      userID != null &&
      text != "" &&
      isValidFixed;
    console.log("valid", isValid);
  }

  onMount(async () => {
    console.log("default", defaultEntry);
    if (defaultEntry.id != null) {
      console.log("made it");
      date = formatDate(defaultEntry.date);
      clientID = defaultEntry.clientID;
      hours = defaultEntry.hours;
      text = defaultEntry.text;
      userID = defaultEntry.userID;
      fixedAmount = defaultEntry.fixedAmount;
      fixcostText = defaultEntry.fixcostText;
      isFixed = defaultEntry.fixedAmount > 0;
    } else {
      date = formatDate(Date.now() / 1000);
    }
    let settings = await ipc.invoke("getSettings");
    entryTextSuggestions = settings.entryTextSuggestions;
    fixcostTextSuggestions = settings.fixcostTextSuggestions;
    clients = await ipc.invoke("getClients");
    users = await ipc.invoke("getUsers");
    clients.map((value: Client, i: number) => {
      if (value.id == id) {
        selectedClientIndex = i;
      }
    });
    validate();
  });
  $: console.log(selectedClientIndex);

  let entryTextSuggestions = [];
  let fixcostTextSuggestions = [];

  let clientID: string;
  let date: string;
  let hours: number;
  let text: string;
  let userID: string;
  let fixedAmount: number;
  let fixcostText: string;
  let isFixed: boolean;
  export let defaultEntry: Entry = {
    clientID: null,
    date: null,
    hours: null,
    text: null,
    userID: null,
    fixedAmount: null,
  };
  $: console.log(text);
</script>

<div on:change={() => validate()}>
  <FormGroup>
    <DatePicker
      datePickerType="single"
      flatpickrProps={{ static: true }}
      dateFormat="d. m. Y"
      bind:value={date}
    >
      <DatePickerInput labelText="Date" placeholder="mm. dd. yyyy" />
    </DatePicker>
    <Dropdown
      titleText="Client"
      bind:selectedIndex={selectedClientIndex}
      on:select={() => {
        clientID = clients[selectedClientIndex].id;
      }}
      items={formatDropdownList(clients)}
    />
    <Dropdown
      titleText="User"
      bind:selectedIndex={selectedUserIndex}
      on:select={() => {
        userID = users[selectedUserIndex].id;
      }}
      items={formatDropdownList(users)}
    />
  </FormGroup>
  <FormGroup>
    <Autocomplete
      bind:value={text}
      labelText="Text"
      bind:suggestions={entryTextSuggestions}
      placeholder="research"
    />
    <NumberInput bind:value={hours} hideSteppers label="Hours" />
  </FormGroup>
  <FormGroup>
    <Toggle bind:toggled={isFixed} labelText="Fixed Amount" />
  </FormGroup>
  {#if isFixed}
    <FormGroup>
      <Autocomplete
        bind:value={fixcostText}
        labelText="Text"
        placeholder="research"
        bind:suggestions={fixcostTextSuggestions}
      />
      <NumberInput bind:value={fixedAmount} hideSteppers label="Amount" />
    </FormGroup>
  {/if}
</div>

<style>
  :global(.bx--date-picker__input) {
    width: 100% !important;
  }
  :global(.bx--date-picker--single) {
    width: 100% !important;
  }
</style>
