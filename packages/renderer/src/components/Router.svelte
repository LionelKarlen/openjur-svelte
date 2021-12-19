<script lang="ts">
  import { onMount } from "svelte";
  import { activeRoute } from "../services/store";
  import { initialiseRouter } from "../services/router";

  onMount(() => initialiseRouter());
</script>

<svelte:component this={$activeRoute.component} {...$activeRoute.params} />
