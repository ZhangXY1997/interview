Promise.myRace = function (promiseArray) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) {
      return reject(new TypeError('params must be an array'));
    }
    // 传入 []：返回的 Promise 状态为 pending，永不完成
    promiseArray.forEach((promise, index) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};