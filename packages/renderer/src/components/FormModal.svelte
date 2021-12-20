<script lang="ts">
  import { Modal } from "carbon-components-svelte";

  export let open = false;
  export let heading = "Heading";
</script>

<Modal
  bind:open
  modalHeading={heading}
  preventCloseOnClickOutside
  on:open
  passiveModal
  on:close={() => (open = false)}
>
  <slot name="form" />
</Modal>
