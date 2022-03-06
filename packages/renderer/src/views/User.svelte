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

  export let id: string;
  let user: User;

  onMount(() => getData(id));
  async function getData(id: string) {
    user = await ipc.invoke("getUserByID", id);
  }
  $: console.log(user);
  let openModal: OpenModal;
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
  </Grid>
{:else}
  loading
{/if}
