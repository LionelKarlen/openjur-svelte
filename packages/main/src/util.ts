import Client from "/type/database/Client";
import User from "/type/database/User";
import id from "/type/util/Id";

export default class Util {
  static generateID(): id {
    return Math.round(new Date(Date.now()).valueOf() / 100).toString();
  }

  static safeRound(value: number, decimals: number): number {
    return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
  }
  static formatAddress(debtor: Client | User) {
    return `${debtor.address}
${debtor.zip} ${debtor.city}
${debtor.country}`;
  }
}
