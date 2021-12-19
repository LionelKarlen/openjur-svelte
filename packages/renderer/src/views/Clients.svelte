<script lang="ts">
  import type Client from "/type/database/Client";
  import ipc from "../services/ipcService";
  import { onMount } from "svelte";
  import {
    StructuredList,
    StructuredListCell,
    StructuredListHead,
    StructuredListRow,
    StructuredListSkeleton,
  } from "carbon-components-svelte";
  import page from "page";

  let clients: Client[] = [];

  onMount(() => getData());
  async function getData() {
    clients = await ipc.invoke("getClients");
  }
  $: console.log(clients);
</script>

<h1>Clients</h1>
{#if clients.length > 0}
  <StructuredList condensed>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Last name</StructuredListCell>
        <StructuredListCell head>First name</StructuredListCell>
      </StructuredListRow>
      {#each clients as client}
        <StructuredListRow on:click={() => page(`/client/${client.id}`)}>
          <StructuredListCell
            >{client.name.split(" ")[
              client.name.split(" ").length - 1
            ]}</StructuredListCell
          >
          <StructuredListCell
            >{client.name.split(" ").slice(0, -1)}</StructuredListCell
          >
        </StructuredListRow>
      {/each}
    </StructuredListHead>
  </StructuredList>
{:else}
  <StructuredListSkeleton rows={2} />
{/if}
