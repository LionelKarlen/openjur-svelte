import type Entry from "../database/Entry";
import type ExportParams from "../util/ExportParams";
import type id from "../util/Id";

export default interface ExportData extends ExportParams{
	date: string,
	entries: Entry[],
	clientName: string, //client.name
	clientAddress: string, //formatted client.address
	mwst: string,
	hoursTotal: number,
	fixedTotal: number,
	subTotal: number,
	mwstTotal: number,
	total: number,
	invoiceID: id
}