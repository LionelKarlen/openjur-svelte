<script lang="ts">
  import { Form } from "carbon-components-svelte";
  import { createEventDispatcher, SvelteComponent } from "svelte";
  import FormButtons from "./FormButtons.svelte";
  const dispatch = createEventDispatcher();

  let submit: Function;
  export let form: typeof SvelteComponent;
</script>

<Form on:submit={() => submit()}>
  <svelte:component this={form} bind:submit />
  <FormButtons on:closeModal={() => dispatch("close")} />
</Form>
