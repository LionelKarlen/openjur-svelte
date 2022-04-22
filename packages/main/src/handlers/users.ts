import { ipcMain } from "electron";
import { Knex } from "knex";
import type id from "../../../../types/util/Id";
import type User from "/type/database/User";
import Util from "../util";
import { getEntriesByUserID } from "./entries";
import { notify } from "./notifications";
import NotificationType from "../../../../types/util/NotificationType";
const collection = "users";

export default function registerUserHandlers(knexClient: Knex) {
  ipcMain.handle("getUsers", async (event, data) => {
    return await getUsers(knexClient);
  });

  ipcMain.handle("getUserByID", async (event, data: id) => {
    return await getUserByID(knexClient, data);
  });

  ipcMain.handle("addUser", async (event, data: User) => {
    return await addUser(knexClient, data);
  });

  ipcMain.handle("updateUser", async (event, data: User) => {
    return await updateUser(knexClient, data);
  });

  ipcMain.handle("deleteUser", async (event, data: id) => {
    return await deleteUser(knexClient, data);
  });
}

export async function getUsers(knexClient: Knex): Promise<User[]> {
  return (await knexClient.select("*").from(collection)) as User[];
}

export async function getUserByID(knexClient: Knex, id: id): Promise<User> {
  let User = (await knexClient
    .select("*")
    .from(collection)
    .where({
      id: `${id}`,
    })) as User[];
  return User[0];
}

export async function addUser(knexClient: Knex, User: User) {
  let id = Util.generateID();
  let exportUser: User = {
    ...User,
    id: id,
  };
  await knexClient.table(collection).insert(exportUser);
}

export async function updateUser(knexClient: Knex, User: User) {
  await knexClient
    .table(collection)
    .where({
      id: `${User.id}`,
    })
    .update(User);
  notify({
    text: "Client updated",
    type: NotificationType.SUCCESS,
  });
}

export async function deleteUser(knexClient: Knex, id: id) {
  if ((await getEntriesByUserID(knexClient, id)).length != 0) {
    notify({
      text: "There are still entries for this User",
      type: NotificationType.ERROR,
    });
    return;
  }
  await knexClient
    .table(collection)
    .where({
      id: `${id}`,
    })
    .delete();
}
