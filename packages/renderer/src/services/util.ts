export function sortAlphabetically(a: string, b: string) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

export function formatDate(date: number) {
  let d = new Date(date * 1000);
  return `${d.getDay()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

export function simplifyDate(date: string) {
  let parts = date.split(".");
  let day = Number.parseInt(parts[0]);
  let month = Number.parseInt(parts[1]);
  let year = Number.parseInt(parts[2]);
  return Date.UTC(year, month - 1, day).valueOf() / 1000;
}
