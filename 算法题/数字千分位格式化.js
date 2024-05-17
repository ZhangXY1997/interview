function format(num) {
  const numArr = String(num).split(".");
  const n1 = numArr[0];
  const n2 = numArr[1];
  let res = "";
  for (let i = n1.length - 1; i >= 0; i--) {
    if ((n1.length - i) % 3 === 0) {
      res = "," + n1[i] + res;
    } else {
      res = n1[i] + res;
    }
  }

  if (n2) {
    res = res + "." + n2;
  }
  return res;
}

console.log(format(12345.333));
