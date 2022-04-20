<script lang="ts">
  import { Dropdown, FormGroup, NumberInput } from "carbon-components-svelte";
  import type User from "/type/database/User";
  import type Wage from "/type/database/Wage";
  export let wage: Wage;
  export let users: User[];
  export let user: User;
  let usedUsers = formatDropdownList(users);
  let selectedUserIndex = 0;
  $: usedUsers = formatDropdownList(users);

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
  <Dropdown bind:selectedIndex={selectedUserIndex} items={usedUsers} />
  <NumberInput bind:value={wage.amount} label="Amount" hideSteppers />
</FormGroup>
