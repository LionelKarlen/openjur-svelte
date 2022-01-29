<script lang="ts">
  import { ClickableTile, Popover, TextInput } from "carbon-components-svelte";

  export let value = "";
  export let labelText = "";
  export let placeholder = "";
  export let suggestions = [];
  function filter(filter: string) {
    filtered = suggestions.filter((val) => val.includes(filter));
  }

  $: filter(value);
  let isopen = false;
  let filtered = [];
</script>

<div>
  <TextInput
    {placeholder}
    {labelText}
    bind:value
    on:focus={() => (isopen = true)}
    on:blur={() => (isopen = false)}
  />
  {#if filtered.length > 0}
    <Popover
      bind:open={isopen}
      relative
      style="max-height: 15rem; overflow-y: scroll;"
    >
      {#each filtered as i}
        <ClickableTile
          style="max-height: 3rem; min-height:3rem"
          on:click={() => {
            value = i;
            isopen = false;
          }}>{i}</ClickableTile
        >
      {/each}
    </Popover>
  {/if}
</div>

<style>
  :global(.bx--popover-contents) {
    width: 100% !important;
    max-width: 100% !important;
    background-color: white !important;
    box-shadow: none !important;
  }
</style>
