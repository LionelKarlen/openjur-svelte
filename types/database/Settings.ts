import type Address from '../util/Address';
export default interface Settings extends Address {
	MWST: number,
	clientTemplatePath: string,
	userTemplatePath: string,
	entryTextSuggestions: string[],
	IBAN: string
}