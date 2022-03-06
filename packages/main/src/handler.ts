import { Knex } from "knex";
import registerClientHandlers from "./handlers/clients";
import registerEntryHandlers from "./handlers/entries";
import registerUserHandlers from "./handlers/users";
import registerExportHandlers from "./handlers/exports";
import registerSettingsHandlers from "./handlers/settings";
import registerInvoiceHandlers from "./handlers/invoices";
import registerFileHandlers from "./handlers/file";

export default function registerHandlers(knexClient: Knex) {
  registerClientHandlers(knexClient);
  registerEntryHandlers(knexClient);
  registerUserHandlers(knexClient);
  registerExportHandlers(knexClient);
  registerInvoiceHandlers(knexClient);
  registerFileHandlers();
  registerSettingsHandlers();
}
