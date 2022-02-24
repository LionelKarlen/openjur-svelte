<script lang="ts">
  import { onMount } from "svelte";
  import ipc from "/@/services/ipcService";
  import DeletionTypes from "../../../../../types/util/DeletionTypes";

  export const submit = async () => {
    await ipc.invoke(invoke, obj.id);
  };
  export let deletionType: DeletionTypes;
  export let invoke: string;
  export let obj: any;
  export let isValid: boolean = true;
  onMount(() => (isValid = true));
</script>

<h4>
  Confirm the deletion of {Object.values(DeletionTypes)[deletionType]}
  {obj.name ? obj.name : obj.id}.
</h4>
