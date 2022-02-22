<script lang="ts">
  import type { SvelteComponent } from "svelte";

  import FormModal from "./FormModal.svelte";

  let open = false;
  let heading: string;
  let form: typeof SvelteComponent;
  let props: {};
  let onReloadData: (e: CustomEvent<any>) => {};

  export function openModal(
    header: string,
    formComponent: typeof SvelteComponent,
    properties: {},
    onClose: (e: CustomEvent<any>) => {}
  ): void {
    heading = header;
    form = formComponent;
    props = properties;
    onReloadData = onClose;

    open = true;
  }
</script>

{#if open}
  <FormModal
    bind:open
    bind:heading
    bind:form
    bind:props
    on:reloadData={onReloadData}
  />
{/if}
