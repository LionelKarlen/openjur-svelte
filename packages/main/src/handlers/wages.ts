import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import Wage from "../../../../types/database/Wage";
const collection = "wages";

export default function registerAmountHandlers(knexClient: Knex) {
  ipcMain.handle("getWagesByUserID", async (event, data: id) => {
    return await getWagesByUserID(knexClient, data);
  });

  ipcMain.handle("addWage", async (event, data: Wage) => {
    return await addWage(knexClient, data);
  });

  ipcMain.handle("updateWage", async (event, data) => {
    return await updatewage(knexClient, data);
  });

  ipcMain.handle("getWagesByClientID", async (event, data: id) => {
    return await getWagesByClientID(knexClient, data);
  });

  ipcMain.handle("deleteWage", async (event, data: Wage) => {
    return await deleteWage(knexClient, data);
  });

  ipcMain.handle("getWage", async (event, clientID: id, userID: id) => {
    return await getWage(knexClient, clientID, userID);
  });
}

export async function getWagesByUserID(
  knexClient: Knex,
  id: id
): Promise<Wage[]> {
  let wage = (await knexClient
    .select("*")
    .from(collection)
    .where({
      userID: `${id}`,
    })) as Wage[];
  return wage;
}

export async function getWagesByClientID(
  knexClient: Knex,
  id: id
): Promise<Wage[]> {
  let wage = (await knexClient
    .select("*")
    .from(collection)
    .where({
      clientID: `${id}`,
    })) as Wage[];
  return wage;
}

export async function addWage(knexClient: Knex, wage: Wage) {
  if (
    (
      await knexClient.table(collection).where({
        userID: `${wage.userID}`,
        clientID: `${wage.clientID}`,
      })
    ).length > 0
  ) {
    await updatewage(knexClient, wage);
  } else {
    await knexClient.table(collection).insert(wage);
  }
}

export async function updatewage(knexClient: Knex, wage: Wage) {
  await knexClient
    .table(collection)
    .where({
      userID: `${wage.userID}`,
      clientID: `${wage.clientID}`,
    })
    .update(wage);
}

export async function deleteWageByClientID(knexClient: Knex, id: id) {
  await knexClient
    .table(collection)
    .where({
      clientID: `${id}`,
    })
    .delete();
}

export async function deleteWage(knexClient: Knex, wage: Wage) {
  await knexClient
    .table(collection)
    .where({
      clientID: `${wage.clientID}`,
      userID: `${wage.userID}`,
    })
    .delete();
}

export async function getWage(knexClient: Knex, clientID: id, userID: id) {
  let wage = (
    await knexClient
      .select("*")
      .from(collection)
      .where({
        userID: `${userID}`,
        clientID: `${clientID}`,
      })
  )[0] as Wage;
  return wage;
}
