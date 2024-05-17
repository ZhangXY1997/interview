function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject("error");
    }
    let result = [];
    let promiseCount = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i]()
        .then((res) => {
          console.log(i, res);
          result[i] = res;
          promiseCount++;
          if (promiseCount === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    }
  });
}

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
