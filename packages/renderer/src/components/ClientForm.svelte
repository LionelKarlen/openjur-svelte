<script lang="ts">
  import { FormGroup, NumberInput, TextInput } from "carbon-components-svelte";
  import ipc from "../services/ipcService";
  import type Client from "/type/database/Client";
  export const submit = () => {
    let client: Client = {
      name: name,
      address: address,
      city: city,
      country: country,
      zip: zip,
    };
    // TODO: Fix validate; it's behind by an action;
    if (isValid) {
      console.log("client", client);
      ipc.invoke("addClient", client);
      name = null;
      address = null;
      city = null;
      country = null;
      zip = 0;
      isValid = false;
    }
  };

  let name: string;
  let address: string;
  let zip: number;
  let city: string;
  let country: string;

  export let isValid = false;
  function validate() {
    console.log("validate");
    console.log(name);
    if (name != null) {
      isValid =
        name.length > 0 &&
        address.length > 0 &&
        city.length > 0 &&
        country.length > 0;
    }
  }
  $: console.log(isValid);
</script>

<div on:change={() => validate()}>
  <FormGroup>
    <TextInput
      bind:value={name}
      labelText="Name"
      placeholder="Max Mustermann"
    />
  </FormGroup>
  <FormGroup>
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
