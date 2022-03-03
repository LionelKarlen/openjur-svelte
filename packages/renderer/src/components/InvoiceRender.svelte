<script lang="ts">
  import { ClickableTile } from "carbon-components-svelte";
  import ipc from "../services/ipcService";
  import type Invoice from "/type/database/Invoice";

  export let invoice: Invoice;
</script>

<ClickableTile on:click={() => ipc.invoke("openFiles", invoice.path)}
  >{invoice.extRef}<br />{invoice.amount}CHF</ClickableTile
>
