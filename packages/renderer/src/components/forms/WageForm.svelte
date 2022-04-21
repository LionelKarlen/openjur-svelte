<script lang="ts">
  import { Button, FormGroup, Row } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import ipc from "/@/services/ipcService";
  import type id from "/type/util/Id";
  import type Wage from "/type/database/Wage";
  import WageSetter from "./WageSetter.svelte";
  import type User from "/type/database/User";
  import { Add32 } from "carbon-icons-svelte";

  export let id: id;

  export const submit = () => {
    console.log("submit");
    console.log("wages", wages);
    for (const wage of wages) {
      ipc.invoke("addWage", wage);
    }
  };

  export let isValid = false;
  export let isUser = false;
  let wages: Wage[] = [];
  let possibleUsers: User[] = [];
  let users: User[] = [];
  function validate() {
    let valid = true;
    for (const wage of wages) {
      if (wage.amount < 0) {
        valid = false;
      }
    }
    isValid = valid;
  }
  async function getData() {
    wages = isUser
      ? await ipc.invoke("getWagesByUserID", id)
      : await ipc.invoke("getWagesByClientID", id);
    console.log("wages", wages);
    await filterUsers();
  }

  onMount(async () => {
    await getData();
    validate();
  });

  async function filterUsers() {
    users = isUser
      ? await ipc.invoke("getClients")
      : await ipc.invoke("getUsers");
    console.log("users", users);

    possibleUsers = isUser
      ? users.filter((v) => !wages.some((u) => u.clientID == v.id))
      : users.filter((v) => !wages.some((u) => u.userID == v.id));
    console.log("poss", possibleUsers);
  }
</script>

<div on:change={() => validate()}>
  <FormGroup>
    <Row style="margin:0">
      <Button
        disabled={possibleUsers.length == 0}
        kind="ghost"
        iconDescription="Add wage"
        icon={Add32}
        on:click={() => {
          let obj = isUser
            ? { userID: id, clientID: possibleUsers[0].id, amount: 0 }
            : { clientID: id, userID: possibleUsers[0].id, amount: 0 };
          wages.push(obj);
          filterUsers();
        }}
      />
    </Row>
  </FormGroup>
  <div class="wrapper">
    {#if users.length > 0}
      {#each wages as wage}
        <WageSetter
          on:reload={() => getData()}
          bind:wage
          bind:users={possibleUsers}
          user={isUser
            ? users.find((v) => v.id == wage.clientID)
            : users.find((v) => v.id == wage.userID)}
        />
      {/each}
    {/if}
  </div>
</div>
