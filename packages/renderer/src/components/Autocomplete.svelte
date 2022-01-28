<script lang="ts">
  import { ClickableTile, Popover, Search } from "carbon-components-svelte";

  let value = "";
  export let suggestions = [];
  function filter(filter: string) {
    filtered = suggestions.filter((val) => val.includes(filter));
  }

  $: filter(value);
  let isopen = false;
  let filtered = [];
</script>

<div>
  <Search
    icon={null}
    placeholder="suggestion"
    bind:value
    on:focus={() => (isopen = true)}
  />
  {#if filtered.length > 0}
    <Popover bind:open={isopen} relative closeOnOutsideClick>
      <div style="padding: 1rem;">
        {#each filtered as i}
          <ClickableTile
            on:click={() => {
              value = i;
              isopen = false;
            }}>{i}</ClickableTile
          >
        {/each}
      </div>
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
