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
// console.log(flatten(arr, 3));

Array.prototype.mtFlat = function(depth = 1) {
  const arr = this;
  const newArr = [];
  (function flat(arr, depth) {
    arr.forEach((a) => {
      if (Array.isArray(a) && depth > 0) {
        flat(a, depth - 1);
      } else {
        newArr.push(a);
      }
    })
  })(arr, depth)

  return newArr;
}

// console.log(arr.flat())


let arr2 = [
  [
    ['1-7', '2-6'],
    '4-6',
    [
      ['2-0', '1-4'],
      ['3-9'],
      '4-5',
    ],
  ]
]

// Q1: 完成数组 flat 函数
function flat(arr) {
  // code
  const result = [];
  (function helper(arr) {for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      helper(arr[i]);
    } else {
      result.push(arr[i])
    }
  }})(arr)
  return result;
}

// console.log(flat(arr2))


// 2026.01.12
Array.prototype.myFlat2 = function(depth = 1) {
  let res = [];
  const arr = this;
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      res = res.concat(item.myFlat2(depth - 1))
    }else {
      res.push(item)
    }}
  );
  return res;
}
console.log(arr2)
 
console.log(arr2.myFlat2())
