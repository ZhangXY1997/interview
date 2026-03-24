Promise.myAll = function (promiseArray) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) {
      reject(new TypeError('params must be an array'));
      return;
    }
    if (promiseArray.length === 0) {
      resolve([]);
      return;
    }
    const result = new Array(promiseArray.length);
    let count = 0;
    promiseArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(res => {
          result[index] = res;
          count++;
          if (count === promiseArray.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
};

function req(res, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (res == 0) {
        reject(0);
      } else {
        resolve(res);
      }
    }, delay);
  });
}
promiseAll(
  [
    req.bind(null, 0, 1000),
    req.bind(null, 1, 3000),
    req.bind(null, 2, 2000),
    req.bind(null, 3, 100),
  ],
  2
).then((res) => console.log(res));
