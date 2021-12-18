import id from "/type/util/Id";

export default class Util {
  static generateID(): id {
    return Math.round(new Date(Date.now()).valueOf() / 100).toString();
  }

  static safeRound(value: number, decimals: number): number {
    return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
  }

  static formatDate(epoch: number): string {
    let date = new Date(epoch * 1000);
    return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
  }
}
