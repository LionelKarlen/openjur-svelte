<script lang="ts">
  import { onMount } from "svelte";
  import ipc from "../services/ipcService";

  import type Client from "/type/database/Client";

  export let id: string;
  let client: Client;

  onMount(() => getData(id));
  async function getData(id: string) {
    client = await ipc.invoke("getClientByID", id);
  }
  $: console.log(client);
</script>

{#if client != null}
  <h1>{client.name}</h1>
  <h2>{id}</h2>
{:else}
  loading
{/if}
