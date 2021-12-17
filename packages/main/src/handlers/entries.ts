import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import type Entry from "/type/database/Entry";
import Util from "../util";
const collection = "entries";

export default function registerEntryHandlers(knexEntry: Knex) {
  ipcMain.handle("getEntries", async (event, data) => {
    return await getEntries(knexEntry);
  });

  ipcMain.handle("getEntriesByClientID", async (event, data: id) => {
    return await getEntriesByClientID(knexEntry, data);
  });

  ipcMain.handle("getEntriesByUserID", async (event, data: id) => {
    return await getEntriesByUserID(knexEntry, data);
  });

  ipcMain.handle("addEntry", async (event, data: Entry) => {
    return await addEntry(knexEntry, data);
  });

  ipcMain.handle("updateEntry", async (event, data: Entry) => {
    return await updateEntry(knexEntry, data);
  });

  ipcMain.handle("deleteEntry", async (event, data: id) => {
    return await deleteEntry(knexEntry, data);
  });
}

export async function getEntries(knexEntry: Knex): Promise<Entry[]> {
  return (await knexEntry.select("*").from(collection)) as Entry[];
}

export async function getEntriesByClientID(
  knexEntry: Knex,
  id: id
): Promise<Entry> {
  let Entry = (await knexEntry
    .select("*")
    .from(collection)
    .where({
      clientID: `${id}`,
    })) as Entry[];
  return Entry[0];
}

export async function getEntriesByUserID(
  knexEntry: Knex,
  id: id
): Promise<Entry> {
  let Entry = (await knexEntry
    .select("*")
    .from(collection)
    .where({
      userID: `${id}`,
    })) as Entry[];
  return Entry[0];
}

export async function addEntry(knexEntry: Knex, Entry: Entry) {
  let id = Util.generateID();
  let exportEntry: Entry = {
    ...Entry,
    id: id,
  };
  await knexEntry.table(collection).insert(exportEntry);
}

export async function updateEntry(knexEntry: Knex, Entry: Entry) {
  await knexEntry
    .table(collection)
    .where({
      id: `${Entry.id}`,
    })
    .update(Entry);
}

export async function deleteEntry(knexEntry: Knex, id: id) {
  await knexEntry
    .table(collection)
    .where({
      id: `${id}`,
    })
    .delete();
}
