export function isType(value, type) {
  Object.prototype.toString.call(value).includes(type)
}
