<script lang="ts">
  import { onMount } from "svelte";
  import EntryTable from "../components/EntryTable.svelte";
  import ModalHandler from "../components/forms/ModalHandler.svelte";

  import ipc from "../services/ipcService";
  import type OpenModal from "/type/util/OpenModal";

  let filteredEntries = [];
  onMount(async () => await getData());
  async function getData() {
    filteredEntries = await ipc.invoke("calculateUnbilledEntries");
    console.log("filteredEntries", filteredEntries);
  }

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
      key: "hoursAmount",
      value: "Hours amount",
    },
    {
      key: "fixedText",
      value: "Fixed text",
    },
    {
      key: "fixedAmount",
      value: "Fixed amount",
    },
    {
      key: "amount",
      value: "Total amount",
    },
    {
      key: "actions",
      value: "Actions",
    },
  ];

  let openModal: OpenModal;
</script>

<h1>Entries</h1>

<ModalHandler bind:openModal />
<EntryTable
  {openModal}
  actionCallback={() => getData()}
  bind:entries={filteredEntries}
  {headers}
  id={""}
/>
