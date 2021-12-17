import Creditor from "../util/Creditor";
import Debtor from "../util/Debtor";
export default interface QRData {
  currency: string;
  amount: number;
  creditor: Creditor;
  debtor: Debtor;
}
