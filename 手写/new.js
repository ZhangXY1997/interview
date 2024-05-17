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
