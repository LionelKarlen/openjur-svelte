import type Address from "../util/Address";
export default interface Settings extends Address {
  MWST: number;
  name: string;
  clientTemplatePath: string;
  userTemplatePath: string;
  entryTextSuggestions: string[];
  fixcostTextSuggestions: string[];
  IBAN: string;
  runningYear: number;
  runningInvoiceID: number;
}
