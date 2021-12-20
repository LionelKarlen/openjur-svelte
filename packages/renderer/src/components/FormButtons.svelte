<script>
  import { Button, Grid, Row } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<Grid>
  <Row style="flex-direction: row-reverse">
    <Button type="submit">Submit</Button>
    <Button kind="ghost" on:click={() => dispatch("closeModal")}>Cancel</Button>
  </Row>
</Grid>
