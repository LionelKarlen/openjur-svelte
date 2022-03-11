<script lang="ts">
  import { ComboBox } from "carbon-components-svelte";
  import type { ComboBoxItem } from "carbon-components-svelte/types/ComboBox/ComboBox.svelte";

  export let value: string = "";
  export let labelText = "";
  export let placeholder = "";
  export let suggestions = [];
  let values = [];
  let selectedIndex = 0;

  function update(item: ComboBoxItem, val: string) {
    if (item.text == val) return false;
    if (!val) return true;
    return item.text.toLowerCase().includes(val.toLowerCase());
  }
  function handleUpdate(s: string) {
    values = [s];
    values.push(...suggestions);
    values = values;
  }
  $: console.log("value", value);
  $: handleUpdate(value);
  $: console.log("selectedIndex", selectedIndex);
  $: console.log("suggestions", suggestions);
  $: console.log("values", values);
</script>

<div>
  <ComboBox
    shouldFilterItem={update}
    titleText={labelText}
    {placeholder}
    bind:selectedIndex
    bind:value
    items={values.map((v, i) => {
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
