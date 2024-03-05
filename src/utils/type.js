export function isType(value, type) {
  return Object.prototype.toString.call(value).includes(type)
}
