<script lang="ts">
  import type User from "/type/database/User";
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
  import FormModal from "../components/forms/FormModal.svelte";
  import UserForm from "../components/forms/UserForm.svelte";
  import { sortAlphabetically } from "../services/util";

  let users: User[] = [];
  let filteredUsers: User[] = [];
  let searchValue: string = "";

  onMount(() => getData());
  async function getData() {
    users = await ipc.invoke("getUsers");
    filterUsers("");
  }
  function filterUsers(search: string) {
    filteredUsers = users.filter((value: User) => {
      return value.name.includes(search);
    });
    filteredUsers.sort((a: User, b: User) => {
      return sortAlphabetically(
        a.name.split(" ")[a.name.split(" ").length - 1],
        b.name.split(" ")[b.name.split(" ").length - 1]
      );
    });
  }
  $: filterUsers(searchValue);

  let openModal = false;
</script>

<h1>Users</h1>
<Grid>
  <Row style="padding: 0;">
    <Search bind:value={searchValue} />
    <Button on:click={() => (openModal = true)}>Add User</Button>
  </Row>
</Grid>
<FormModal
  bind:open={openModal}
  heading="Add User"
  form={UserForm}
  on:reloadData={() => getData()}
/>
{#if users.length > 0}
  <StructuredList condensed selection>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Last name</StructuredListCell>
        <StructuredListCell head>First name</StructuredListCell>
      </StructuredListRow>
      {#each filteredUsers as user}
        <StructuredListRow on:click={() => page(`/user/${user.id}`)}>
          <StructuredListCell
            >{user.name.split(" ")[
              user.name.split(" ").length - 1
            ]}</StructuredListCell
          >
          <StructuredListCell
            >{user.name.split(" ").slice(0, -1)}</StructuredListCell
          >
        </StructuredListRow>
      {/each}
    </StructuredListHead>
  </StructuredList>
{:else}
  <StructuredListSkeleton rows={1} />
{/if}
