<script lang="ts">
  import { Form } from "carbon-components-svelte";
  import { createEventDispatcher, SvelteComponent } from "svelte";
  import FormButtons from "./FormButtons.svelte";
  const dispatch = createEventDispatcher();

  let submit: Function;
  let isValid: boolean = false;
  export let form: typeof SvelteComponent;
</script>

<Form
  on:submit={() => {
    submit();
    dispatch("close");
  }}
>
  <svelte:component this={form} bind:submit bind:isValid />
  <FormButtons on:closeModal={() => dispatch("close")} bind:isValid />
</Form>
