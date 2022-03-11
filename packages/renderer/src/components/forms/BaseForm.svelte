<script lang="ts">
  import { Form } from "carbon-components-svelte";
  import { createEventDispatcher, SvelteComponent } from "svelte";
  import FormButtons from "./FormButtons.svelte";
  const dispatch = createEventDispatcher();

  let submit: Function;
  let isValid: boolean = false;
  export let form: typeof SvelteComponent;
  export let props: any;
  export let isModal = true;
</script>

<Form
  on:submit={async () => {
    await submit();
    dispatch("submit");
  }}
  novalidate={true}
>
  <svelte:component this={form} bind:submit bind:isValid {...props} />
  <FormButtons on:closeModal={() => dispatch("close")} bind:isValid {isModal} />
</Form>
