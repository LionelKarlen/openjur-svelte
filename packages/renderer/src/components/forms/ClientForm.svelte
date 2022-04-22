<script lang="ts">
  import { FormGroup, NumberInput, TextInput } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import ipc from "../../services/ipcService";
  import type Client from "/type/database/Client";
  export const submit = () => {
    let client: Client = {
      name: name,
      address: address,
      city: city,
      country: "CH",
      zip: zip,
      id: defaultClient.id != null ? defaultClient.id : null,
    };
    // TODO: Fix validate; it's behind by an action;
    if (isValid) {
      console.log("client", client);
      if (defaultClient.id != null) {
        ipc.invoke("updateClient", client);
      } else {
        ipc.invoke("addClient", client);
      }
    }
    name = null;
    address = null;
    city = null;
    zip = 0;
    isValid = false;
  };

  let name: string;
  let address: string;
  let zip: number;
  let city: string;
  export let defaultClient: Client = {
    address: null,
    city: null,
    country: "ch",
    name: null,
    zip: 0,
    id: null,
  };
  onMount(() => {
    if (defaultClient.id != null) {
      name = defaultClient.name;
      address = defaultClient.address;
      zip = defaultClient.zip;
      city = defaultClient.city;
    }
    validate();
  });

  export let isValid = false;
  function validate() {
    if (name != null) {
      isValid = name.length > 0 && address.length > 0 && city.length > 0;
    }
  }
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
  </FormGroup>
</div>
