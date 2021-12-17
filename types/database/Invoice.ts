import type id from "../util/Id";

export default interface Invoice {
	id: id,
	clientID?:id,
	userID?:id,
	path: string,
	extRef: string,
	amount: number
}