Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

function myFinally(promise, onFinally) {
  // your code here
  return promise.then(
    (data) => {
      return Promise.resolve(onFinally()).then(() => data);
    },
    (err) => {
      return Promise.resolve(onFinally()).then(() => {
        throw err;
      });
    }
  );
}
