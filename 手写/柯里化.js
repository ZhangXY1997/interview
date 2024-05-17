function sum() {
  let prevSum = [...arguments].reduce((a, b) => a + b);
  let result = function () {
    return sum(...[...arguments, prevSum]);
  };
  result.toString = function () {
    return prevSum;
  };
  return result;
}
console.log(sum(1)(2)(3, 4).toString());

function curry(fn) {
  return function curried(...args) {
    // if number of arguments match
    if (args.length >= fn.length) {
      return fn.call(this, ...args);
    }
    return function (...missingArgs) {
      return curried.call(this, ...args, ...missingArgs);
    };
  };
}
const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3)); // '1_2_3'
