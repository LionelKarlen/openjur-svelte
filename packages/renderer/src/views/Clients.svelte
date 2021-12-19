<script lang="ts">
  import type Client from "/type/database/Client";
  import ipc from "../services/ipcService";
  import { onMount } from "svelte";
  import {
    Search,
    StructuredList,
    StructuredListCell,
    StructuredListHead,
    StructuredListRow,
    StructuredListSkeleton,
  } from "carbon-components-svelte";
  import page from "page";

  let clients: Client[] = [];
  let filteredClients: Client[] = [];
  let searchValue: string = "";

  onMount(() => getData());
  async function getData() {
    clients = await ipc.invoke("getClients");
    filteredClients = clients;
  }
  function filterClients(search: string) {
    filteredClients = clients.filter((value: Client) => {
      return value.name.includes(search);
    });
  }
  $: filterClients(searchValue);
</script>

<h1>Clients</h1>
<Search bind:value={searchValue} />
{#if clients.length > 0}
  <StructuredList condensed selection>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Last name</StructuredListCell>
        <StructuredListCell head>First name</StructuredListCell>
      </StructuredListRow>
      {#each filteredClients as client}
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
