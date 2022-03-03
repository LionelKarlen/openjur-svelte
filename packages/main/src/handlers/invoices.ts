import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import { getEntries } from "./entries";
import knex from "knex";
import Invoice from "../../../../types/database/Invoice";
import { deleteFiles } from "./file";
const collection = "invoices";

export default function registerInvoiceHandlers(knexClient: Knex) {
  ipcMain.handle("getInvoicesByClientID", async (event, data: id) => {
    return await getInvoicesByClientID(knexClient, data);
  });

  ipcMain.handle("getInvoicesByUserID", async (event, data: id) => {
    return await getInvoicesByUserID(knexClient, data);
  });

  ipcMain.handle("getInvoiceByID", async (event, data: id) => {
    return await getInvoiceByID(knexClient, data);
  });

  ipcMain.handle("deleteInvoice", async (event, data: id) => {
    return await deleteInvoice(knexClient, data);
  });

  ipcMain.handle("validateInvoices", async (event, data) => {
    return await validateInvoices(knexClient);
  });
}

export async function getInvoiceByID(
  knexClient: Knex,
  id: id
): Promise<Invoice> {
  let Invoice = (await knexClient
    .select("*")
    .from(collection)
    .where({
      id: `${id}`,
    })) as Invoice[];
  return Invoice[0];
}

export async function getInvoicesByClientID(
  knexClient: Knex,
  id: id
): Promise<Invoice[]> {
  let Invoice = (await knexClient
    .select("*")
    .from(collection)
    .where({
      clientID: `${id}`,
    })) as Invoice[];
  return Invoice;
}

export async function getInvoicesByUserID(
  knexClient: Knex,
  id: id
): Promise<Invoice[]> {
  let Invoice = (await knexClient
    .select("*")
    .from(collection)
    .where({
      userID: `${id}`,
    })) as Invoice[];
  return Invoice;
}

export async function addInvoice(knexClient: Knex, invoice: Invoice) {
  await knexClient.table(collection).insert(invoice);
}

export async function deleteInvoice(knexClient: Knex, id: id) {
  await knexClient
    .table("entries")
    .where({ invoiceID: `${id}` })
    .update({
      invoiceID: null,
    });
  let data = await knexClient.table(collection).where({
    id: `${id}`,
  });
  let invoice: Invoice = data[0];
  await deleteFiles(invoice.path);
  await knexClient
    .table(collection)
    .where({
      id: `${id}`,
    })
    .delete();
}

export async function validateInvoices(knexClient: Knex) {}
