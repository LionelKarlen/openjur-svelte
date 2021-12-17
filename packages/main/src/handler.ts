import { Knex } from "knex";
import registerClientHandlers from "./handlers/client";

export default function registerHandlers(knexClient: Knex) {
  registerClientHandlers(knexClient);
}
