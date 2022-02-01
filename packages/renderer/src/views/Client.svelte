<script lang="ts">
  import { onMount } from "svelte";
  import Address from "/@/components/Address.svelte";
  import ipc from "../services/ipcService";
  import page from "page";

  import type Client from "/type/database/Client";
  import {
    Button,
    Column,
    DataTable,
    DataTableSkeleton,
    Grid,
    Row,
  } from "carbon-components-svelte";
  import FormModal from "../components/forms/FormModal.svelte";
  import ClientForm from "../components/forms/ClientForm.svelte";
  import ClientDeleteForm from "../components/forms/ClientDeleteForm.svelte";
  import EntryForm from "../components/forms/EntryForm.svelte";

  import Edit32 from "carbon-icons-svelte/lib/Edit32";
  import Delete32 from "carbon-icons-svelte/lib/Delete32";
  import type Entry from "/type/database/Entry";
  import type { DataTableRow } from "carbon-components-svelte/types/DataTable/DataTable.svelte";
  import ExportForm from "../components/forms/ExportForm.svelte";

  let headers = [
    {
      key: "date",
      value: "Date",
    },
    {
      key: "user",
      value: "User",
    },
    {
      key: "text",
      value: "Text",
    },
    {
      key: "hours",
      value: "Hours",
    },
    {
      key: "amount",
      value: "Amount",
    },
    {
      key: "fixedAmount",
      value: "FixedAmount",
    },
    {
      key: "invoiceID",
      value: "InvoiceID",
    },
  ];

  export let id: string;
  let client: Client;
  let entry: Entry;
  let openClientModal = false;
  let openConfirmModal = false;
  let openEntryModal = false;
  let openExportModal = false;
  let filteredEntries: DataTableRow[] = [];

  onMount(() => getData(id));
  async function getData(id: string) {
    client = await ipc.invoke("getClientByID", id);
    filteredEntries = await ipc.invoke("calculateTable", {
      id: id,
      false: false,
    });
  }
  $: console.log(client);
  $: console.log("entries", filteredEntries);
</script>

{#if client != null}
  <FormModal
    bind:open={openEntryModal}
    heading="Add Entry"
    form={EntryForm}
    props={{
      defaultEntry: entry,
      id: id,
    }}
    on:reloadData={() => getData(id)}
  />
  <FormModal
    bind:open={openClientModal}
    heading="Add Client"
    form={ClientForm}
    props={{
      defaultClient: client,
    }}
    on:reloadData={() => getData(id)}
  />
  <FormModal
    bind:open={openExportModal}
    heading="Export to File"
    form={ExportForm}
    props={{
      id: id,
      isUser: false,
    }}
    on:reloadData={() => getData(id)}
  />
  <FormModal
    bind:open={openConfirmModal}
    heading="Confirm delete"
    form={ClientDeleteForm}
    props={{
      obj: client,
    }}
    on:reloadData={() => page("/clients")}
  />
  <Grid>
    <Row style="padding: 1rem;">
      <Column style="padding:0;">
        <h1>{client.name}</h1>
        <Address
          address={client.address}
          zip={client.zip}
          country={client.country}
          city={client.city}
        />
      </Column>
      <Button
        on:click={() => (openEntryModal = true)}
        style="margin-top: 2rem; margin-bottom: 2rem;margin-right:2rem;padding-right: 15px;"
        >New Entry</Button
      >
      <Button
        on:click={() => (openClientModal = true)}
        iconDescription="Edit"
        kind="ghost"
        icon={Edit32}
        style="margin-top: 2rem; margin-bottom: 2rem;"
      />
      <Button
        on:click={() => (openConfirmModal = true)}
        iconDescription="Delete"
        kind="ghost"
        icon={Delete32}
        style="margin-top: 2rem; margin-bottom: 2rem;"
      />
    </Row>
    <Row style="padding:0">
      <Column style="padding:0">
        {#if filteredEntries.length > 0}
          <DataTable style="padding:0" {headers} rows={filteredEntries} />
        {:else}
          <DataTableSkeleton showHeader={true} showToolbar={false} />
        {/if}
        <Button on:click={() => (openExportModal = true)}>Export</Button>
      </Column>
    </Row>
  </Grid>
{:else}
  loading
{/if}
