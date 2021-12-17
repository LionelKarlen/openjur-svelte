import id from "/type/util/Id";

export default class Util {
  static generateID(): id {
    return Math.round(new Date(Date.now()).valueOf() / 100).toString();
  }
}
