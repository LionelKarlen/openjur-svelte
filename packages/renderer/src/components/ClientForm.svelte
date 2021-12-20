<script lang="ts">
  import { Form, FormGroup, TextInput } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import FormButtons from "./FormButtons.svelte";
  const dispatch = createEventDispatcher();

  function submit() {
    console.log("submit", text);
  }
  let text;
</script>

<Form on:submit={(e) => submit()}>
  <FormGroup>
    <TextInput
      bind:value={text}
      labelText="User name"
      placeholder="Enter user name..."
    />
  </FormGroup>
  <FormButtons on:closeModal={() => dispatch("close")} />
</Form>
