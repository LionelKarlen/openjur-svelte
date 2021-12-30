<script lang="ts">
  import { onMount } from "svelte";
  import Address from "/@/components/Address.svelte";
  import ipc from "../services/ipcService";
  import page from "page";

  import type User from "/type/database/User";
  import { Button, Column, Grid, Row } from "carbon-components-svelte";
  import FormModal from "../components/forms/FormModal.svelte";
  import UserDeleteForm from "../components/forms/UserDeleteForm.svelte";

  import Edit32 from "carbon-icons-svelte/lib/Edit32";
  import Delete32 from "carbon-icons-svelte/lib/Delete32";
  import UserForm from "../components/forms/UserForm.svelte";

  export let id: string;
  let user: User;
  let openUserModal = false;
  let openConfirmModal = false;

  onMount(() => getData(id));
  async function getData(id: string) {
    user = await ipc.invoke("getUserByID", id);
  }
  $: console.log(user);
</script>

{#if user != null}
  <FormModal
    bind:open={openUserModal}
    heading="Add User"
    form={UserForm}
    props={{
      defaultUser: user,
    }}
    on:reloadData={() => getData(id)}
  />
  <FormModal
    bind:open={openConfirmModal}
    heading="Confirm delete"
    form={UserDeleteForm}
    props={{
      obj: user,
    }}
    on:reloadData={() => page("/users")}
  />
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
        on:click={() => (openUserModal = true)}
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
  </Grid>
{:else}
  loading
{/if}
