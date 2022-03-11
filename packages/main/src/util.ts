import Client from "/type/database/Client";
import Entry from "/type/database/Entry";
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

  static sortEntries(entries: Entry[]) {
    return entries.sort((a, b) => a.date - b.date);
  }

  static summariseFixcosts(charges: any[]) {
    let finalCharges = [];
    for (const charge of charges) {
      let times = charges.filter(
        (v) => v.charge == charge.charge && v.amount == charge.amount
      ).length;
      let total = times * charge.amount;
      finalCharges.push({
        charge: charge.charge,
        amount: charge.amount,
        times: times,
        totalAmount: total,
      });
    }
    finalCharges = getUniqueValues(finalCharges);
    return finalCharges;
  }
}

function getUniqueValues(array: any[]) {
  var filterArray = array.reduce((previous, current) => {
    if (
      !previous.some(
        (item: any) =>
          item.charge === current.charge &&
          item.amount === current.amount &&
          item.times === current.times &&
          item.totalAmount === current.totalAmount
      )
    ) {
      previous.push(current);
    }
    return previous;
  }, []);
  return filterArray;
}
