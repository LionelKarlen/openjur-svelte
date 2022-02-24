<script lang="ts">
  import type Client from "/type/database/Client";
  import ipc from "../services/ipcService";
  import { onMount } from "svelte";
  import {
    Button,
    Grid,
    Row,
    Search,
    StructuredList,
    StructuredListCell,
    StructuredListHead,
    StructuredListRow,
    StructuredListSkeleton,
  } from "carbon-components-svelte";
  import page from "page";
  import ClientForm from "../components/forms/ClientForm.svelte";
  import { sortAlphabetically } from "../services/util";
  import ModalHandler from "../components/forms/ModalHandler.svelte";
  import type OpenModal from "/type/util/OpenModal";

  let clients: Client[] = [];
  let filteredClients: Client[] = [];
  let searchValue: string = "";

  onMount(() => getData());
  async function getData() {
    clients = await ipc.invoke("getClients");
    filterClients("");
  }
  function filterClients(search: string) {
    filteredClients = clients.filter((value: Client) => {
      return value.name.includes(search);
    });
    filteredClients.sort((a: Client, b: Client) => {
      return sortAlphabetically(
        a.name.split(" ")[a.name.split(" ").length - 1],
        b.name.split(" ")[b.name.split(" ").length - 1]
      );
    });
  }
  $: filterClients(searchValue);
  let openModal: OpenModal;
</script>

<h1>Clients</h1>
<Grid>
  <Row>
    <Search bind:value={searchValue} />
    <Button
      on:click={() => openModal("Add Client", ClientForm, {}, () => getData())}
      >Add Client</Button
    >
  </Row>
</Grid>
<ModalHandler bind:openModal />
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
