import { writable } from "svelte/store";
import type Route from "/type/util/Route";
import { routes } from "./router";

export const activeRoute = writable<Route>(routes[0]);
