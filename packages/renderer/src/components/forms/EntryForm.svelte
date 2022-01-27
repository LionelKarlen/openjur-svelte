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
  import ipc from "/@/services/ipcService";
  import { simplifyDate } from "/@/services/util";
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
      id: defaultEntry.id != null ? defaultEntry.id : null,
    };
    console.log("entry", entry);
    ipc.invoke("addEntry", entry);
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
    if (defaultEntry.id != null) {
      // date=formatDate(defaultEntry.date);
      clientID = defaultEntry.clientID;
      hours = defaultEntry.hours;
      text = defaultEntry.text;
      userID = defaultEntry.userID;
      fixedAmount = defaultEntry.fixedAmount;
      isFixed = defaultEntry.fixedAmount > 0;
    }
    clients = await ipc.invoke("getClients");
    users = await ipc.invoke("getUsers");
    clients.map((value: Client, i: number) => {
      if (value.id == id) {
        selectedClientIndex = i;
      }
    });
  });
  $: console.log(selectedClientIndex);

  let clientID: string;
  let date: string;
  let hours: number;
  let text: string;
  let userID: string;
  let fixedAmount: number;
  let isFixed: boolean;
  export let defaultEntry: Entry = {
    clientID: null,
    date: null,
    hours: null,
    text: null,
    userID: null,
    fixedAmount: null,
  };
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
    <TextInput bind:value={text} labelText="Text" placeholder="Research" />
    <NumberInput bind:value={hours} hideSteppers label="Hours" />
  </FormGroup>
  <FormGroup>
    <Toggle bind:toggled={isFixed} labelText="Fixed Amount" />
  </FormGroup>
  {#if isFixed}
    <FormGroup>
      <TextInput bind:value={text} labelText="Text" placeholder="Research" />
      <NumberInput bind:value={fixedAmount} hideSteppers label="Amount" />
    </FormGroup>
  {/if}
</div>
