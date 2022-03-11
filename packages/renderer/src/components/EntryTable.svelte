<script lang="ts">
  import {
    Button,
    DataTable,
    DataTableSkeleton,
  } from "carbon-components-svelte";
  import ipc from "../services/ipcService";

  import type Entry from "/type/database/Entry";
  import type OpenModal from "/type/util/OpenModal";
  import { Edit32, Delete32, Document32 } from "carbon-icons-svelte";
  import EntryForm from "./forms/EntryForm.svelte";
  import DeleteForm from "./forms/DeleteForm.svelte";
  import DeletionTypes from "../../../../types/util/DeletionTypes";
  import type {
    DataTableHeader,
    DataTableRow,
  } from "carbon-components-svelte/types/DataTable/DataTable.svelte";
  import type id from "/type/util/Id";
  import type Invoice from "/type/database/Invoice";

  export let entries: Entry[];
  export let headers: DataTableHeader[];
  export let id: id;
  export let isUser: boolean = false;
  export let actionCallback: () => void;
  export let openModal: OpenModal;
  let filteredEntries: DataTableRow[];
  async function filter(array: Entry[]) {
    let filteredArray: DataTableRow[] = [];
    let invoices: Invoice[] = isUser
      ? await ipc.invoke("getInvoicesByUserID", id)
      : await ipc.invoke("getInvoicesByClientID", id);
    for (const invoice of invoices) {
      let obj = {
        id: invoice.id,
        invoice: invoice,
        extRef: invoice.extRef,
        amount: invoice.amount,
        actions: " ",
        entries: array.filter((v) => v.invoiceID == invoice.id),
      };
      filteredArray.push(obj);
    }
    let obj = {
      id: "None",
      extRef: "None",
      amount: "",
      actions: "",
      invoice: null,
      entries: array.filter((v) => v.invoiceID == "N/A"),
    };
    filteredArray.push(obj);
    console.log(filteredArray);
    filteredEntries = filteredArray;
  }

  $: filter(entries);
</script>

{#if entries.length > 0}
  <DataTable
    style="padding:0"
    headers={[
      {
        key: "extRef",
        value: "Invoice",
      },
      {
        key: "amount",
        value: "Amount",
        display: (amount) => `${amount}CHF`,
      },
      {
        key: "actions",
        value: "Actions",
      },
    ]}
    rows={filteredEntries}
    expandedRowIds={["None"]}
    expandable
  >
    <svelte:fragment slot="cell" let:cell let:row>
      {#if cell.key === "actions" && row.id != "None"}
        <Button
          on:click={async () => {
            ipc.invoke("openFiles", row.invoice.path);
          }}
          iconDescription="Open"
          kind="ghost"
          icon={Document32}
        />
        <Button
          on:click={() => {
            openModal(
              "Confirm Delete",
              DeleteForm,
              {
                obj: row.invoice,
                invoke: "deleteInvoice",
                deletionType: DeletionTypes.Invoice,
              },
              actionCallback
            );
          }}
          iconDescription="Delete"
          kind="ghost"
          icon={Delete32}
        />
      {:else}{cell.value}{/if}
    </svelte:fragment>
    <svelte:fragment slot="expanded-row" let:row>
      <DataTable style="padding:0" {headers} rows={row.entries}>
        <svelte:fragment slot="cell" let:cell let:row>
          {#if cell.key === "actions"}
            <Button
              on:click={async () => {
                let entry = await ipc.invoke("getEntryByID", row.id);
                openModal(
                  "Edit Entry",
                  EntryForm,
                  { id: id, defaultEntry: entry },
                  actionCallback
                );
              }}
              iconDescription="Edit"
              kind="ghost"
              icon={Edit32}
            />
            <Button
              on:click={() => {
                openModal(
                  "Confirm Delete",
                  DeleteForm,
                  {
                    obj: row,
                    invoke: "deleteEntry",
                    deletionType: DeletionTypes.Entry,
                  },
                  actionCallback
                );
              }}
              iconDescription="Delete"
              kind="ghost"
              icon={Delete32}
            />
          {:else}{cell.value}{/if}
        </svelte:fragment>
      </DataTable>
    </svelte:fragment>
  </DataTable>
{:else}
  <h3>No data found.</h3>
  <DataTableSkeleton showHeader={false} showToolbar={false} />
{/if}

<style>
  :global(tr.bx--parent-row.bx--expandable-row, tbody tr[data-child-row] td) {
    padding-left: 1.5% !important;
  }
  :global(tr.bx--expandable-row--hover) {
    background-color: unset !important;
  }
  :global(tr.bx--parent-row.bx--expandable-row:hover + tr[data-child-row] td) {
    background-color: unset !important;
  }
  :global(.bx--data-table tbody tr:hover td, .bx--data-table tbody tr:hover) {
    background-color: unset !important;
  }
  :global(.bx--data-table
      td.bx--table-expand[data-previous-value="collapsed"]) {
    border-bottom: 1px solid #e0e0e0 !important;
  }
  :global(tr[data-child-row] > td:first-of-type) {
    padding: 0 !important;
  }
</style>
