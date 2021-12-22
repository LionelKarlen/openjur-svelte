<script lang="ts">
  import { onMount } from "svelte";
  import ipc from "/@/services/ipcService";
  import type Client from "/type/database/Client";

  export const submit = async () => {
    await ipc.invoke("deleteClient", obj.id);
  };

  export let obj: Client;
  export let isValid: boolean = true;
  onMount(() => (isValid = true));
</script>

<h4>Confirm the deletion of client {obj.name}.</h4>
