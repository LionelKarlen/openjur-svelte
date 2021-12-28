<script lang="ts">
  import { onMount } from "svelte";
  import ipc from "/@/services/ipcService";
  import type User from "/type/database/User";

  export const submit = async () => {
    await ipc.invoke("deleteUser", obj.id);
  };

  export let obj: User;
  export let isValid: boolean = true;
  onMount(() => (isValid = true));
</script>

<h4>Confirm the deletion of client {obj.name}.</h4>
