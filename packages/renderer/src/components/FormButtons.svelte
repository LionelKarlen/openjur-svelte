<script lang="ts">
  import { Button, Grid, Row } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let isValid: boolean;
</script>

<Grid>
  <Row style="flex-direction: row-reverse">
    <Button disabled={!isValid} type="submit">Submit</Button>
    <Button kind="ghost" on:click={() => dispatch("closeModal")}>Cancel</Button>
  </Row>
</Grid>
