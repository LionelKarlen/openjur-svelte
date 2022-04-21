<script lang="ts">
  import "./tailwind.css";
  import Router from "/@/components/Router.svelte";
  import "carbon-components-svelte/css/g10.css";
  import { Content, Grid, Tab, Tabs } from "carbon-components-svelte";
  import page from "page";
  import NotificationHandler from "./components/NotificationHandler.svelte";

  let tabs = [
    {
      label: "Clients",
      name: "/clients",
    },
    {
      label: "Users",
      name: "/users",
    },
    {
      label: "Entries",
      name: "/entries",
    },
    { label: "Settings", name: "/" },
  ];

  let selected = 3;
</script>

<main class="bg-background h-screen">
  <Tabs triggerHref="/" bind:selected>
    {#each tabs as tab}
      <Tab label={tab.label} on:click={() => page(tab.name)} />
    {/each}
  </Tabs>
  <Content>
    <Grid>
      <Router />
    </Grid>
    <NotificationHandler />
  </Content>
</main>
