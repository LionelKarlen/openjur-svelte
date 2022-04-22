<script lang="ts">
  import { FormGroup, NumberInput, TextInput } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import ipc from "../../services/ipcService";
  import type User from "/type/database/User";
  export const submit = () => {
    let user: User = {
      name: name,
      address: address,
      city: city,
      country: "CH",
      zip: zip,
      baseWage: wage,
      id: defaultUser.id != null ? defaultUser.id : null,
    };
    // TODO: Fix validate; it's behind by an action;
    if (isValid) {
      console.log("user", user);
      if (defaultUser.id != null) {
        ipc.invoke("updateUser", user);
      } else {
        ipc.invoke("addUser", user);
      }
    }
    name = null;
    address = null;
    city = null;
    zip = 0;
    isValid = false;
    wage = 0;
  };

  let name: string;
  let address: string;
  let zip: number;
  let city: string;
  let wage: number;
  export let defaultUser: User = {
    address: null,
    city: null,
    country: null,
    name: null,
    zip: 0,
    id: null,
    baseWage: 0,
  };
  onMount(() => {
    if (defaultUser.id != null) {
      name = defaultUser.name;
      address = defaultUser.address;
      zip = defaultUser.zip;
      city = defaultUser.city;
      wage = defaultUser.baseWage;
    }
    validate();
  });

  export let isValid = false;
  function validate() {
    if (name != null) {
      isValid =
        name.length > 0 &&
        wage >= 0 &&
        zip >= 0 &&
        address.length > 0 &&
        city.length > 0;
    }
  }
</script>

<!-- <div on:change={() => validate()}> -->
<FormGroup>
  <TextInput
    bind:value={name}
    labelText="Name"
    placeholder="Max Mustermann"
    on:change={validate}
  />
  <NumberInput
    bind:value={wage}
    hideSteppers
    label="Wage (Hourly)"
    on:change={validate}
  />
</FormGroup>
<FormGroup>
  <TextInput
    bind:value={address}
    labelText="Address"
    placeholder="Bohnenstrasse 1"
    on:change={validate}
  />
  <NumberInput bind:value={zip} hideSteppers label="Zip" on:change={validate} />
  <TextInput
    bind:value={city}
    labelText="City"
    placeholder="Zürich"
    on:change={validate}
  />
</FormGroup>
<!-- </div> -->
