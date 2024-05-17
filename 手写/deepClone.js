function deepClone(obj, map = new Map()) {
  if (typeof obj !== "object" || obj === null) return obj;
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
