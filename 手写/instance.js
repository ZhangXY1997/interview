function myInstanceof(left, right) {
  if (typeof left !== "object" || left === null) return false;
  if (left.__proto__ === right.prototype) {
    return true;
  } else {
    return myInstanceof(left.__proto__, right);
  }
}
