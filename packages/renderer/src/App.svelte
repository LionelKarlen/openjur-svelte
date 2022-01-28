<script lang="ts">
  import "./tailwind.css";
  import Router from "/@/components/Router.svelte";
  import {
    Header,
    SkipToContent,
    HeaderNav,
    HeaderNavItem,
    Content,
    Grid,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderPanelLinks,
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/g10.css";
  import { Close20, Menu20 } from "carbon-icons-svelte";

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

  let isSideNavOpen = false;
</script>

<main class="bg-background h-screen">
  <Header platformName="OpenJUR" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderNav>
      {#each tabs as tab}
        <HeaderNavItem href={tab.name} text={tab.label} />
      {/each}
    </HeaderNav>
    <HeaderUtilities>
      <HeaderAction
        bind:isOpen={isSideNavOpen}
        icon={Menu20}
        closeIcon={Close20}
      >
        <HeaderPanelLinks>
          {#each tabs as tab}
            <HeaderPanelLink href={tab.name}>{tab.label}</HeaderPanelLink>
          {/each}
          <HeaderPanelDivider />
          <HeaderPanelLink href="/">Settings</HeaderPanelLink>
        </HeaderPanelLinks>
      </HeaderAction>
    </HeaderUtilities>
  </Header>
  <Content>
    <Grid>
      <Router />
    </Grid>
  </Content>
</main>
