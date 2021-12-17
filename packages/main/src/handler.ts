import { Knex } from "knex";
import registerClientHandlers from "./handlers/clients";
import registerEntryHandlers from "./handlers/entries";
import registerUserHandlers from "./handlers/users";

export default function registerHandlers(knexClient: Knex) {
  registerClientHandlers(knexClient);
  registerEntryHandlers(knexClient);
  registerUserHandlers(knexClient);
}
