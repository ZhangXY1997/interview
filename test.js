console.log('1');
Promise.resolve().then(() => console.log('2'));
setTimeout(() => console.log('3'), 0);
new Promise(res => {
  console.log('4');
  res();
}).then(() => console.log('5'));
// 输出顺序及原因？

// 1
// 4
// 2
// 5
// 3