<script lang="ts">
  import { onMount } from "svelte";
  import Address from "/@/components/Address.svelte";
  import ipc from "../services/ipcService";
  import page from "page";

  import type User from "/type/database/User";
  import { Button, Column, Grid, Row } from "carbon-components-svelte";

  import Edit32 from "carbon-icons-svelte/lib/Edit32";
  import Delete32 from "carbon-icons-svelte/lib/Delete32";
  import UserForm from "../components/forms/UserForm.svelte";
  import ModalHandler from "../components/forms/ModalHandler.svelte";
  import type OpenModal from "/type/util/OpenModal";
  import DeleteForm from "../components/forms/DeleteForm.svelte";
  import DeletionTypes from "../../../../types/util/DeletionTypes";
  import EntryTable from "../components/EntryTable.svelte";
  import ExportForm from "../components/forms/ExportForm.svelte";
  import type Entry from "/type/database/Entry";
  import WageForm from "../components/forms/WageForm.svelte";
  import { CurrencyDollar32 } from "carbon-icons-svelte";

  export let id: string;
  let user: User;
  let filteredEntries: Entry[] = [];

  onMount(() => getData(id));
  async function getData(id: string) {
    user = await ipc.invoke("getUserByID", id);
    filteredEntries = await ipc.invoke("calculateTable", {
      id: id,
      isUser: true,
    });
  }
  $: console.log(user);
  let openModal: OpenModal;

  let headers = [
    {
      key: "date",
      value: "Date",
    },
    {
      key: "client",
      value: "Client",
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
      key: "actions",
      value: "Actions",
    },
  ];
</script>

{#if user != null}
  <ModalHandler bind:openModal />
  <Grid>
    <Row style="padding: 1rem;">
      <Column style="padding:0;">
        <Row style="padding: 0; align-items:center">
          <h1>{user.name}</h1>
          <h3 style="margin-left:1rem;">-</h3>
          <h3 style="margin-left: 1rem;">{user.baseWage} CHF/h</h3>
        </Row>
        <Address
          address={user.address}
          zip={user.zip}
          country={user.country}
          city={user.city}
        />
      </Column>
      <Button
        on:click={() =>
          openModal("Edit Wages", WageForm, { id: id, isUser: true }, () =>
            getData(id)
          )}
        iconDescription="Wage"
        kind="ghost"
        icon={CurrencyDollar32}
        style="margin-top: 2rem; margin-bottom: 2rem;"
      />
      <Button
        on:click={() =>
          openModal("Edit User", UserForm, { defaultUser: user }, () =>
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
              invoke: "deleteUser",
              obj: user,
              deletionType: DeletionTypes.User,
            },
            () => page("/users")
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
          disabled
          on:click={() =>
            openModal(
              "Export to File",
              ExportForm,
              { id: id, isUser: true },
              () => getData(id)
            )}>Export</Button
        >
      </Column>
    </Row>
  </Grid>
{:else}
  loading
{/if}
