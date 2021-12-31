import type Entry from "../database/Entry";
import type ExportParams from "../util/ExportParams";
import type id from "../util/Id";

export default interface ExportData {
  date: string;
  fromDate: string;
  toDate: string;
  entries: any[];
  clientName: string; //client.name
  clientAddress: string; //formatted client.address
  mwst: string;
  hoursTotal: number;
  chargeTotal: number;
  subTotal: number;
  mwstTotal: number;
  total: number;
  invoiceID: id;
}
