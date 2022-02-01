import type id from "./Id";

export default interface ExportParams {
	fromDate: number,
	toDate: number,
	id: id,
	isUser: boolean,
}