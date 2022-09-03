// utils function check value is null or spaces
export default function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}
