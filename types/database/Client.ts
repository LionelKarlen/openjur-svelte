import id from "../util/Id";
import Address from '../util/Address';

export default interface Client extends Address{
	id: id,
	name: string,
}