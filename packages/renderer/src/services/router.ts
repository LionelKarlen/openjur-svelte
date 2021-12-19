import Entries from "/@/views/Entries.svelte";
import Entry from "/@/views/Entry.svelte";
import Settings from "/@/views/Settings.svelte";
import Users from "/@/views/Users.svelte";
import User from "/@/views/User.svelte";
import Clients from "/@/views/Clients.svelte";
import Client from "/@/views/Client.svelte";
import type Route from "/type/util/Route";
import page from "page";
import { activeRoute } from "./store";

export const routes: Route[] = [
  {
    name: "/",
    component: Settings,
    params: {},
  },
  {
    name: "/entries",
    component: Entries,
    params: {},
  },
  {
    name: "/entry/:id",
    component: Entry,
    params: {},
  },
  {
    name: "/users",
    component: Users,
    params: {},
  },
  {
    name: "/user/:id",
    component: User,
    params: {},
  },
  {
    name: "/clients",
    component: Clients,
    params: {},
  },
  {
    name: "/client/:id",
    component: Client,
    params: {},
  },
];

function registerRoute(route: Route) {
  page(route.name, (ctx) => {
    activeRoute.set({
      component: route.component,
      name: route.name,
      params: ctx.params,
    });
  });
}

export function initialiseRouter() {
  for (const route of routes) {
    registerRoute(route);
  }
  page.start();
}
