import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import type Entry from "/type/database/Entry";
import Util from "../util";
import { formatDate } from "../../../renderer/src/services/util";
import { getClientByID } from "./clients";
import { getUserByID } from "./users";
const collection = "entries";

export default function registerEntryHandlers(knexClient: Knex) {
  ipcMain.handle("getEntries", async (event, data) => {
    return await getEntries(knexClient);
  });

  ipcMain.handle("calculateTable", async (event, data: id) => {
    return await calculateTable(knexClient, data);
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

export async function calculateTable(knexClient: Knex, id: id, isUser = false) {
  let filtered = [];
  let data = isUser
    ? await getEntriesByUserID(knexClient, id)
    : await getEntriesByClientID(knexClient, id);
  console.log("data", data);
  for (const value of data) {
    let client = await getClientByID(knexClient, value.clientID);
    let user = await getUserByID(knexClient, value.userID);
    console.log("user", user);
    filtered.push({
      id: value.id,
      date: formatDate(value.date),
      client: client.name,
      user: user.name,
      text: value.text,
      hours: value.hours,
      amount: user.baseWage * value.hours,
      fixedAmount: value.fixedAmount ? value.fixedAmount : "N/A",
    });
  }
  console.log("filtered", filtered);
  return filtered;
}
