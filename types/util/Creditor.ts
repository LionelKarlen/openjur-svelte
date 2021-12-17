import type Address from './Address';
export default interface Creditor extends Address{
	name: string,
	account: string
}