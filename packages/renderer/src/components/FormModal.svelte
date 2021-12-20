<script lang="ts">
  import { Modal } from "carbon-components-svelte";
  import BaseForm from "./BaseForm.svelte";

  export let open = false;
  export let heading = "Heading";
  export let form;

  function closeModal() {
    open = false;
  }
</script>

<Modal
  bind:open
  modalHeading={heading}
  preventCloseOnClickOutside
  on:open
  passiveModal
  on:close={() => closeModal()}
>
  <BaseForm {form} on:close={() => closeModal()} />
</Modal>
