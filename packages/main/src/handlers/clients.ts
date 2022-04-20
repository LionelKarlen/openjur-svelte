import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import type Client from "/type/database/Client";
import Util from "../util";
import { getEntriesByClientID } from "./entries";
const collection = "Clients";

export default function registerClientHandlers(knexClient: Knex) {
  ipcMain.handle("getClients", async (event, data) => {
    return await getClients(knexClient);
  });

  ipcMain.handle("getClientByID", async (event, data: id) => {
    return await getClientByID(knexClient, data);
  });

  ipcMain.handle("addClient", async (event, data: Client) => {
    return await addClient(knexClient, data);
  });

  ipcMain.handle("updateClient", async (event, data: Client) => {
    return await updateClient(knexClient, data);
  });

  ipcMain.handle("deleteClient", async (event, data: id) => {
    return await deleteClient(knexClient, data);
  });
}

export async function getClients(knexClient: Knex): Promise<Client[]> {
  return (await knexClient.select("*").from(collection)) as Client[];
}

export async function getClientByID(knexClient: Knex, id: id): Promise<Client> {
  let client = (await knexClient
    .select("*")
    .from(collection)
    .where({
      id: `${id}`,
    })) as Client[];
  return client[0];
}

export async function addClient(knexClient: Knex, client: Client) {
  let id = Util.generateID();
  let exportClient: Client = {
    ...client,
    id: id,
  };
  await knexClient.table(collection).insert(exportClient);
}

export async function updateClient(knexClient: Knex, client: Client) {
  await knexClient
    .table(collection)
    .where({
      id: `${client.id}`,
    })
    .update(client);
}

export async function deleteClient(knexClient: Knex, id: id) {
  if ((await getEntriesByClientID(knexClient, id)).length != 0) {
    return;
  }
  await knexClient
    .table(collection)
    .where({
      id: `${id}`,
    })
    .delete();
}
