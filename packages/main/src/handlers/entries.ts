import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import type Entry from "/type/database/Entry";
import Util from "../util";
const collection = "entries";

export default function registerEntryHandlers(knexClient: Knex) {
  ipcMain.handle("getEntries", async (event, data) => {
    return await getEntries(knexClient);
  });

  ipcMain.handle("getEntriesByClientID", async (event, data: id) => {
    return await getEntriesByClientID(knexClient, data);
  });

  ipcMain.handle("getEntriesByUserID", async (event, data: id) => {
    return await getEntriesByUserID(knexClient, data);
  });

  ipcMain.handle("getEntriesByID", async (event, data: id) => {
    return await getEntryByID(knexClient, data);
  });

  ipcMain.handle("addEntry", async (event, data: Entry) => {
    return await addEntry(knexClient, data);
  });

  ipcMain.handle("updateEntry", async (event, data: Entry) => {
    return await updateEntry(knexClient, data);
  });

  ipcMain.handle("deleteEntry", async (event, data: id) => {
    return await deleteEntry(knexClient, data);
  });
}

export async function getEntries(knexClient: Knex): Promise<Entry[]> {
  return (await knexClient.select("*").from(collection)) as Entry[];
}

export async function getEntriesByClientID(
  knexClient: Knex,
  id: id
): Promise<Entry[]> {
  let entry = (await knexClient
    .select("*")
    .from(collection)
    .where({
      clientID: `${id}`,
    })) as Entry[];
  return entry;
}

export async function getEntriesByUserID(
  knexClient: Knex,
  id: id
): Promise<Entry[]> {
  let entry = (await knexClient
    .select("*")
    .from(collection)
    .where({
      userID: `${id}`,
    })) as Entry[];
  return entry;
}

export async function getEntryByID(knexClient: Knex, id: id): Promise<Entry> {
  let entry = (await knexClient
    .select("*")
    .from(collection)
    .where({
      id: `${id}`,
    })) as Entry[];
  return entry[0];
}

export async function addEntry(knexClient: Knex, Entry: Entry) {
  let id = Util.generateID();
  let exportEntry: Entry = {
    ...Entry,
    id: id,
  };
  await knexClient.table(collection).insert(exportEntry);
}

export async function updateEntry(knexClient: Knex, Entry: Entry) {
  await knexClient
    .table(collection)
    .where({
      id: `${Entry.id}`,
    })
    .update(Entry);
}

export async function deleteEntry(knexClient: Knex, id: id) {
  await knexClient
    .table(collection)
    .where({
      id: `${id}`,
    })
    .delete();
}
