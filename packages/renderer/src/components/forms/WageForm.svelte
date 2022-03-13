<script lang="ts">
  import { Button, Dropdown, FormGroup, Row } from "carbon-components-svelte";
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
      ipc.invoke("");
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
    wages = await ipc.invoke("getWagesByClientID", id);
  }

  onMount(async () => {
    await getData();
    filterUsers();
    validate();
  });

  async function filterUsers() {
    users = await ipc.invoke("getUsers");

    possibleUsers = users.filter((v) => !wages.some((u) => u.userID == v.id));
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
          let obj = { clientID: id, userID: possibleUsers[0].id, amount: 0 };
          wages.push(obj);
          filterUsers();
        }}
      />
    </Row>
  </FormGroup>
  <div class="wrapper">
    {#each wages as wage}
      <WageSetter
        bind:wage
        bind:users={possibleUsers}
        user={users.find((v) => v.id == wage.userID)}
      />
    {/each}
  </div>
</div>
