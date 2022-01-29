<script lang="ts">
  import {
    ClickableTile,
    Form,
    Popover,
    TextInput,
  } from "carbon-components-svelte";

  let value = "";
  export let labelText = "";
  export let suggestions: string[] = [];
</script>

<div>
  <Form
    on:submit={() => {
      suggestions.push(value);
      suggestions = suggestions;
      console.log(suggestions);
      value = "";
    }}
  >
    <TextInput bind:value {labelText} />
  </Form>
  <Popover open relative style="max-height: 15rem; overflow-y: scroll;">
    <div>
      {#each suggestions as i}
        <ClickableTile
          style="max-height: 3rem; min-height:3rem"
          on:click={() => {
            suggestions.splice(suggestions.indexOf(i), 1);
            suggestions = suggestions;
          }}>{i}</ClickableTile
        >
      {/each}
    </div>
  </Popover>
</div>

<style>
  :global(.bx--popover-contents) {
    width: 100% !important;
    max-width: 100% !important;
    background-color: white !important;
    box-shadow: none !important;
  }
</style>
