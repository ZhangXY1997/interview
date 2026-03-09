function myNew(constructor, ...args) {
  let obj = new Object();
  obj.__proto__ = constructor.prototype;
  let result = constructor.apply(obj, args);
  return typeof result === "object" ? result : obj;
}

function myNew2(constructor, ...args) {
  let newObj = new Object();
  newObj.__proto__ = constructor.prototype;
  let result = constructor.apply(newObj, args);
  return typeof result === "object" ? result : newObj;
}

function myNew(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const res = constructor.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

// 2026.03.08

function myNew2 (fn, ...args) {
  const newObj = Object.create(fn.prototype);
  const res = fn.apply(newObj, args);
  return typeof res === 'object' && res !== null ? res : newObj;
}







