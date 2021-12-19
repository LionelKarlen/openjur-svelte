<script lang="ts">
  import "./tailwind.css";
  import Router from "/@/components/Router.svelte";
  import { Tabs, Tab } from "carbon-components-svelte";
  import "carbon-components-svelte/css/g10.css";
  import page from "page";

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
  ];
</script>

<main class="bg-background h-screen">
  <Tabs triggerHref="/">
    {#each tabs as tab}
      <Tab label={tab.label} on:click={() => page(tab.name)} />
    {/each}
  </Tabs>
  <Router />
</main>
