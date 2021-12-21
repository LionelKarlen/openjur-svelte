<script lang="ts">
  import { onMount } from "svelte";
  import Address from "/@/components/Address.svelte";
  import ipc from "../services/ipcService";

  import type Client from "/type/database/Client";
  import { Button, Column, Grid, Row } from "carbon-components-svelte";
  import FormModal from "../components/forms/FormModal.svelte";
  import ClientForm from "../components/forms/ClientForm.svelte";

  export let id: string;
  let client: Client;
  let openModal = false;

  onMount(() => getData(id));
  async function getData(id: string) {
    client = await ipc.invoke("getClientByID", id);
  }
  $: console.log(client);
</script>

{#if client != null}
  <FormModal
    bind:open={openModal}
    heading="Add Client"
    form={ClientForm}
    props={{
      defaultClient: client,
    }}
    on:reloadData={() => getData(id)}
  />
  <Grid>
    <Row style="padding: 1rem;">
      <Column style="padding:0;">
        <h1>{client.name}</h1>
        <Address
          address={client.address}
          zip={client.zip}
          country={client.country}
          city={client.city}
        />
      </Column>
      <Button on:click={() => (openModal = true)}>Edit</Button>
    </Row>
  </Grid>
{:else}
  loading
{/if}
