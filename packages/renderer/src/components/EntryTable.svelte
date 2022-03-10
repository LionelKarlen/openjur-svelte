<script lang="ts">
  import {
    Button,
    DataTable,
    DataTableSkeleton,
  } from "carbon-components-svelte";
  import ipc from "../services/ipcService";

  import type Entry from "/type/database/Entry";
  import type OpenModal from "/type/util/OpenModal";
  import { Edit32, Delete32 } from "carbon-icons-svelte";
  import EntryForm from "./forms/EntryForm.svelte";
  import DeleteForm from "./forms/DeleteForm.svelte";
  import DeletionTypes from "../../../../types/util/DeletionTypes";

  export let entries: Entry[];
  export let headers;
  export let id;
  export let actionCallback: () => void;
  export let openModal: OpenModal;
  let filteredEntries;
  function filter(array: Entry[]) {
    filteredEntries = array.filter((v) => v.invoiceID);
  }

  $: filter(entries);
</script>

{#if filteredEntries.length > 0}
  <DataTable
    style="padding:0"
    headers={[
      {
        key: "invoiceID",
        value: "Invoice",
      },
      {
        key: "amount",
        value: "Amount",
      },
    ]}
    rows={[
      {
        id: "0",
        invoiceID: "123123",
        amount: 123,
        entries: filteredEntries,
      },
      {
        id: "1",
        invoiceID: "adfds",
        amount: 321,
        entries: filteredEntries,
      },
    ]}
    expandable
  >
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
