function deepClone(obj, map = new Map()) {
  if (typeof obj !== "object" || obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (map.has(obj)) return map.get(obj);

  var newObj = Array.isArray(obj) ? [] : {};
  map.set(obj, newObj);
  const keys = [...Object.getOwnPropertySymbols(obj), ...Object.keys(obj)];

  for (let key of keys) {
    newObj[key] =
      typeof obj[key] === "object" ? deepCopy(obj[key], map) : obj[key];
  }

  return newObj;
}





function deepClone2(value, map = new Map()) {
  if (typeof value !== 'object' || value === null) return value;
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);

  if (map.has(value)) return map.get(value);

  let newValue = Array.isArray(value) ? [] : {};
  map.set(value, newValue);

  let keys = Object.keys(value);
  for (let i = 0; i < keys.length; i++) {
    newValue[keys[i]] = typeof value[keys[i]] === 'object' ? deepClone2(value[keys[i]]) : value[keys[i]];
  }

  return newValue;
}


const a = Symbol(1);
const v = {[Symbol(1)]: 1}
console.log(Object.keys(v))
console.log( typeof new Date())