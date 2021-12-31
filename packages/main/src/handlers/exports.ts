import { ipcMain } from "electron";
import { Knex } from "knex";
import type ExportParams from "/type/util/ExportParams";
import Entry from "/type/database/Entry";
import { calculateTable } from "./entries";
import { getClientByID } from "./clients";
import { getUserByID } from "./users";
import Util from "../util";
import ExportData from "../../../../types/export/ExportData";
import { formatDate } from "../../../renderer/src/services/util";
import QRData from "../../../../types/export/QRdata";
import Creditor from "/type/util/Creditor";
import Debtor from "../../../../types/util/Debtor";

export default function registerExportHandlers(knexClient: Knex) {
  ipcMain.handle("exportTable", async (event, data: ExportParams) => {
    exportTable(knexClient, data);
  });
}

export async function exportTable(knexClient: Knex, params: ExportParams) {
  let initialEntries: Entry[];
  if (params.isUser) {
    initialEntries = await knexClient
      .select("*")
      .from("Entries")
      .where({
        userID: `${params.id}`,
        invoiceID: null,
      })
      .andWhere("Date", ">=", params.fromDate)
      .andWhere("Date", "<=", params.toDate);
  } else {
    initialEntries = await knexClient
      .select("*")
      .from("Entries")
      .where({
        clientID: `${params.id}`,
        invoiceID: null,
      })
      .andWhere("Date", ">=", params.fromDate)
      .andWhere("Date", "<=", params.toDate);
  }
  let entries = await calculateTable(knexClient, initialEntries);
  console.log("formattedEntries", entries);

  let hoursTotal = 0;
  let chargeTotal = 0;
  for (const entry of entries) {
    hoursTotal += entry.amount;
    if (entry.fixedAmount != "N/A") {
      chargeTotal += Number.parseInt(entry.fixedAmount.toString());
    }
  }
  let debtor = params.isUser
    ? await getUserByID(knexClient, params.id)
    : await getClientByID(knexClient, params.id);
  let date = new Date(Date.now()).getTime() / 1000;
  let invoiceID = `${new Date(date * 1000).getFullYear()}`; //TODO: Add running invoice count from settings
  let mwst = 7.7;
  //FIXME: Add current year to settings to enable resetting the running count.
  let subTotal = chargeTotal + hoursTotal;
  let mwstTotal = Util.safeRound(subTotal * (mwst / 100), 1);
  let total = subTotal + mwstTotal;
  let exportObject: ExportData = {
    date: formatDate(date),
    entries: entries,
    clientName: debtor.name,
    clientAddress: Util.formatAddress(debtor),
    mwst: `${mwst}%`,
    hoursTotal: hoursTotal,
    chargeTotal: chargeTotal,
    subTotal: subTotal,
    mwstTotal: mwstTotal,
    total: total,
    invoiceID: invoiceID,
    fromDate: formatDate(params.fromDate),
    toDate: formatDate(params.toDate),
  };
  console.log("export", exportObject);
  let exportCreditor: Creditor = {
    ...debtor,
    account: "",
  };
  let exportDebtor: Debtor = {
    ...debtor,
  };
  let qrObject: QRData = {
    amount: total,
    currency: "CHF",
    creditor: exportCreditor,
    debtor: exportDebtor,
  };
  console.log("qrExport", qrObject);
}
