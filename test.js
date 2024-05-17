function flat(arr) {
  return arr.reduce((acc, val) => {
    // console.log(acc, val);
    if (Array.isArray(val)) {
      acc.push(...val);
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

// 示例使用
const nestedArray = [1, [2, 3], [4, [5, 6]]];
console.log(flat(nestedArray)); // 输出: [1, 2, 3, 4, 5, 6]
