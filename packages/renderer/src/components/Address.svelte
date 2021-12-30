<script lang="ts">
  import { Column } from "carbon-components-svelte";

  export let address: string;
  export let zip: number;
  export let city: string;
  export let country: string;
</script>

<Column style="padding:0;">
  <h5>{address}</h5>
  <h5>{zip} {city}</h5>
  <h5>{country}</h5>
</Column>
