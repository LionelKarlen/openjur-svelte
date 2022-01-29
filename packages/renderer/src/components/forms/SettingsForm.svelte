<script lang="ts">
  import {
    FileUploader,
    FormGroup,
    NumberInput,
    TextInput,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import Suggestion from "../Suggestion.svelte";
  import type Settings from "/type/database/Settings";

  export function submit() {
    // let settings: Settings = {
    // };
  }

  onMount(() => {
    let settings: Settings;
    if (settings) {
      mwst = settings.MWST;
      clientTemplateFiles = [settings.clientTemplatePath];
      userTemplateFiles = [settings.userTemplatePath];
      entryTextSuggestions = settings.entryTextSuggestions;
      fixcostTextSuggestions = settings.fixcostTextSuggestions;
      address = settings.address;
      zip = settings.zip;
      city = settings.city;
      country = settings.country;
      iban = settings.IBAN;
    }
  });

  export let isValid = false;
  function validate() {
    isValid =
      mwst > 0 &&
      clientTemplateFiles.length > 0 &&
      userTemplateFiles.length > 0 &&
      address.length > 0 &&
      zip > 0 &&
      city.length > 0 &&
      country.length > 0 &&
      iban.length > 0;
  }

  let mwst = 7.7;
  let clientTemplateFiles = [];
  let userTemplateFiles = [];
  let entryTextSuggestions = [];
  let fixcostTextSuggestions = [];
  let address = "";
  let zip = 0;
  let city = "";
  let country = "";
  let iban = "";
</script>

<div on:change={() => validate()}>
  <FormGroup>
    <NumberInput bind:value={mwst} hideSteppers={true} label={"MWST"} />
  </FormGroup>

  <FormGroup>
    <FileUploader
      bind:files={clientTemplateFiles}
      status={clientTemplateFiles.length > 0 ? "complete" : "edit"}
      buttonLabel="Upload"
      labelDescription="Client Template File"
    />
    <FileUploader
      bind:files={userTemplateFiles}
      status={userTemplateFiles.length > 0 ? "complete" : "edit"}
      buttonLabel="Upload"
      labelDescription="User Template File"
    />
  </FormGroup>

  <FormGroup>
    <Suggestion
      labelText="Entry text suggestions"
      suggestions={entryTextSuggestions}
    />
  </FormGroup>
  <FormGroup>
    <Suggestion
      labelText="Fixcost text suggestions"
      suggestions={fixcostTextSuggestions}
    />
  </FormGroup>

  <FormGroup>
    <TextInput
      bind:value={iban}
      labelText="IBAN"
      placeholder="CHXX XXXX XXXX XXXX XXXX X"
    />
    <TextInput
      bind:value={address}
      labelText="Address"
      placeholder="Bohnenstrasse 1"
    />
    <NumberInput bind:value={zip} hideSteppers label="Zip" />
    <TextInput bind:value={city} labelText="City" placeholder="Zürich" />

    <TextInput bind:value={country} labelText="Country" placeholder="CH" />
  </FormGroup>
</div>

<style>
  :global(.bx--file-container) {
    margin-top: 0 !important;
  }
</style>
