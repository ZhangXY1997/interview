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
// const curriedJoin = curry(join);

// console.log(curriedJoin(1, 2, 3)); // '1_2_3'


// 有两种柯里化，一种参数数量固定，一种参数数量不固定
// 1. 参数数量固定
function curry2(fn) {
  return function curryFunc(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function res(...next) {
        return curryFunc(...args, ...next);
      }
    }
  }
}
const curried2Join = curry2(join);

console.log(curried2Join(1)(2)(3)); // '1_2_3'

// 2. 参数数量不固定
function curry3(fn, ...args) {
  return function curryFunc(...newArgs) {
    if (newArgs.length == 0) {
      
      return fn(...args);
    } else {
        return curry3(fn, ...args, ...newArgs);
      
    }
  }
}

var sum = (...rest) => rest.reduce((pre, cur) => cur + pre, 0);
const curried3sum = curry3(sum);

console.log(curried3sum(1)(2,3)(4)())
