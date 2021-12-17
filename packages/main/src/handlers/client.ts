import { ipcMain } from "electron";
import { Knex } from "knex";

export default function registerClientHandlers(knexClient: Knex) {
  ipcMain.handle("getClients", async (event, data) => {
    return await getClients(knexClient);
  });
}

export async function getClients(knexClient: Knex) {
  return await knexClient.select("*").from("Clients");
}
