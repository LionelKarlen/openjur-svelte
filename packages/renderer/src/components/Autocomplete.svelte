<script lang="ts">
  import { ComboBox } from "carbon-components-svelte";
  import type { ComboBoxItem } from "carbon-components-svelte/types/ComboBox/ComboBox.svelte";

  export let value = "";
  export let labelText = "";
  export let placeholder = "";
  export let suggestions = [];

  function update(item: ComboBoxItem, val: string) {
    if (!val) return true;
    return item.text.toLowerCase().includes(val.toLowerCase());
  }
</script>

<div>
  <ComboBox
    shouldFilterItem={update}
    titleText={labelText}
    {placeholder}
    bind:value
    items={suggestions.map((v, i) => {
      return {
        id: i.toString(),
        text: v,
      };
    })}
  />
</div>

<style>
  :global(.bx--popover-contents) {
    width: 100% !important;
    max-width: 100% !important;
    background-color: white !important;
    box-shadow: none !important;
  }
</style>
