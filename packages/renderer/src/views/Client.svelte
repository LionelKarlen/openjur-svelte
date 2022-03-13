<script lang="ts">
  import { onMount } from "svelte";
  import Address from "/@/components/Address.svelte";
  import ipc from "../services/ipcService";
  import page from "page";

  import type Client from "/type/database/Client";
  import { Button, Column, Grid, Row } from "carbon-components-svelte";
  import ClientForm from "../components/forms/ClientForm.svelte";
  import EntryForm from "../components/forms/EntryForm.svelte";

  import Edit32 from "carbon-icons-svelte/lib/Edit32";
  import Delete32 from "carbon-icons-svelte/lib/Delete32";
  import type Entry from "/type/database/Entry";
  import ExportForm from "../components/forms/ExportForm.svelte";
  import ModalHandler from "../components/forms/ModalHandler.svelte";
  import type OpenModal from "/type/util/OpenModal";
  import DeleteForm from "../components/forms/DeleteForm.svelte";
  import DeletionTypes from "../../../../types/util/DeletionTypes";
  import EntryTable from "../components/EntryTable.svelte";
  import WageForm from "../components/forms/WageForm.svelte";
  import { CurrencyDollar32 } from "carbon-icons-svelte";

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
    {
      key: "actions",
      value: "Actions",
    },
  ];

  export let id: string;
  let client: Client;
  let openModal: OpenModal;
  let filteredEntries: Entry[] = [];

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
  <ModalHandler bind:openModal />
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
        on:click={() => {
          openModal("Add Entry", EntryForm, { id: id }, () => getData(id));
        }}
        style="margin-top: 2rem; margin-bottom: 2rem;margin-right:2rem;padding-right: 15px;"
        >New Entry</Button
      >
      <Button
        on:click={() =>
          openModal("Edit Wages", WageForm, { id: id }, () => getData(id))}
        iconDescription="Wage"
        kind="ghost"
        icon={CurrencyDollar32}
        style="margin-top: 2rem; margin-bottom: 2rem;"
      />
      <Button
        on:click={() =>
          openModal("Edit Client", ClientForm, { defaultClient: client }, () =>
            getData(id)
          )}
        iconDescription="Edit"
        kind="ghost"
        icon={Edit32}
        style="margin-top: 2rem; margin-bottom: 2rem;"
      />
      <Button
        on:click={() =>
          openModal(
            "Confirm Delete",
            DeleteForm,
            {
              obj: client,
              invoke: "deleteClient",
              deletionType: DeletionTypes.Client,
            },
            () => page("/clients")
          )}
        iconDescription="Delete"
        kind="ghost"
        icon={Delete32}
        style="margin-top: 2rem; margin-bottom: 2rem;"
      />
    </Row>
    <Row style="padding:0">
      <Column style="padding:0">
        <EntryTable
          {openModal}
          actionCallback={() => getData(id)}
          bind:entries={filteredEntries}
          {headers}
          {id}
        />
        <Button
          on:click={() =>
            openModal(
              "Export to File",
              ExportForm,
              { id: id, isUser: false },
              () => getData(id)
            )}>Export</Button
        >
        <!-- <Row style="margin:0">
          {#each invoices as invoice}
            <div
              on:contextmenu|preventDefault={() =>
                openModal(
                  "Confirm Delete",
                  DeleteForm,
                  {
                    obj: invoice,
                    invoke: "deleteInvoice",
                    deletionType: DeletionTypes.Invoice,
                  },
                  () => {
                    getData(id);
                  }
                )}
            >
              <InvoiceRender {invoice} />
            </div>
          {/each}
        </Row> -->
      </Column>
    </Row>
  </Grid>
{:else}
  loading
{/if}
