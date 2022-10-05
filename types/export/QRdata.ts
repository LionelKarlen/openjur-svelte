import { Currency } from "swissqrbill/lib/node/cjs/shared/types";
import type Creditor from "../util/Creditor";
import type Debtor from "../util/Debtor";
export default interface QRData {
  currency: Currency;
  amount: number;
  creditor: Creditor;
  debtor: Debtor;
  reference?: string;
}
