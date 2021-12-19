import type id from "../util/Id";
import type Address from '../util/Address';

export default interface Client extends Address{
	id?: id,
	name: string,
}