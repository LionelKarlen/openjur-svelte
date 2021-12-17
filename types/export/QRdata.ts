import type Creditor from "../util/Creditor";
import type Debtor from "../util/Debtor";
export default interface QRData {
  currency: string;
  amount: number;
  creditor: Creditor;
  debtor: Debtor;
}
