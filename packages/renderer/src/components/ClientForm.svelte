<script lang="ts">
  import { FormGroup, TextInput } from "carbon-components-svelte";
  export const submit = () => {
    console.log("client", text);
  };

  let text: string;
</script>

<FormGroup>
  <TextInput
    bind:value={text}
    labelText="User name"
    placeholder="Enter user name..."
  />
</FormGroup>
