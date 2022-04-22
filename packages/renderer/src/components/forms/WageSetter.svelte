<script lang="ts">
  import {
    Button,
    Column,
    Dropdown,
    FormGroup,
    NumberInput,
    Row,
  } from "carbon-components-svelte";
  import { Close32 } from "carbon-icons-svelte";
  import { createEventDispatcher } from "svelte";
  import ipc from "/@/services/ipcService";
  import type User from "/type/database/User";
  import type Wage from "/type/database/Wage";
  export let wage: Wage;
  export let users: User[];
  export let user: User;
  let usedUsers = formatDropdownList(users);
  let selectedUserIndex = 0;
  $: usedUsers = formatDropdownList(users);
  const dispatch = createEventDispatcher();

  function formatDropdownList(list: any[]) {
    let l = [];
    console.log("user", user);
    l.push({
      id: user.id,
      text: user.name,
    });
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      l.push({
        id: element.id,
        text: element.name,
      });
    }
    return l;
  }
</script>

<FormGroup>
  <Row>
    <Column style="max-width: 90%">
      <Dropdown bind:selectedIndex={selectedUserIndex} items={usedUsers} />
      <NumberInput bind:value={wage.amount} label="Amount" hideSteppers />
    </Column>
    <Button
      kind="ghost"
      iconDescription="Delete wage"
      icon={Close32}
      on:click={async () => {
        await ipc.invoke("deleteWage", wage);
        dispatch("reload");
      }}
    />
  </Row>
</FormGroup>
