function flatten(arr, depth = 1) {
  const newArr = [];
  (function flat(arr, depth) {
    arr.forEach((a) => {
      if (Array.isArray(a) && depth > 0) {
        flat(a, depth - 1);
      } else {
        newArr.push(a);
      }
    });
  })(arr, depth);
  return newArr;
}

const arr = [1, [2, 3], [4, [5, [6]], 7]];
console.log(flatten(arr, 3));
