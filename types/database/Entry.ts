import type id from "../util/Id";

export default interface Entry {
	id?: id,
	date: number,
	clientID: id,
	userID: id,
	text: string,
	fixcostAmount?: number,
	invoiceID?: id,
	hours: number,
	amount?: number,
	fixcostText?: string,
}