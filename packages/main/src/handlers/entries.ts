import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import type Entry from "/type/database/Entry";
import Util from "../util";
import { formatDate } from "../../../renderer/src/services/util";
import { getClientByID } from "./clients";
import { getUserByID } from "./users";
import { getWage, getWagesByUserID } from "./wages";
const collection = "entries";

export default function registerEntryHandlers(knexClient: Knex) {
  ipcMain.handle("getEntries", async (event, data) => {
    return await getEntries(knexClient);
  });

  ipcMain.handle(
    "calculateTable",
    async (event, data: { id: id; isUser: boolean }) => {
      let entries = data.isUser
        ? await getEntriesByUserID(knexClient, data.id)
        : await getEntriesByClientID(knexClient, data.id);
      return await calculateTable(knexClient, entries);
    }
  );

  ipcMain.handle("getEntriesByClientID", async (event, data: id) => {
    return await getEntriesByClientID(knexClient, data);
  });

  ipcMain.handle("getEntriesByUserID", async (event, data: id) => {
    return await getEntriesByUserID(knexClient, data);
  });

  ipcMain.handle("getEntryByID", async (event, data: id) => {
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
  let entries = (await knexClient.select("*").from(collection)) as Entry[];
  return Util.sortEntries(entries);
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
  return Util.sortEntries(entry);
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
  return Util.sortEntries(entry);
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

export async function calculateTable(knexClient: Knex, entries: Entry[]) {
  let filtered = [];
  console.log("data", entries);
  for (const value of entries) {
    let client = await getClientByID(knexClient, value.clientID);
    let user = await getUserByID(knexClient, value.userID);
    console.log("user", user);
    let wage = await getWage(knexClient, value.clientID, value.userID);
    let amount = wage != null ? wage.amount : user.baseWage;
    filtered.push({
      id: value.id,
      date: formatDate(value.date),
      client: client.name,
      user: user.name,
      text: value.text,
      hours: value.hours,
      invoiceID: value.invoiceID ? value.invoiceID : "N/A",
      amount: amount * value.hours,
      fixedAmount: value.fixcostAmount ? value.fixcostAmount : "N/A",
    });
  }
  console.log("filtered", filtered);
  return filtered;
}
