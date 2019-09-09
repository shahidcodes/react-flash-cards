export default function Capitalize(str) {
  if (str && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }
  return "";
}
