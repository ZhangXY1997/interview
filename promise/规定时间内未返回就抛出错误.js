function checkPromise(p, delay) {
  let timer;
  return Promise.race([
    p,
    new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        reject(new Error("timeout"));
      }, delay);
    }).finally(() => {
      console.log(timer);
      clearTimeout(timer);
    }),
  ]);
}

checkPromise(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  }),
  3000
);

// 给了两个函数①const api = () => {}，返回一个promise②const warning = () => {}发出一个警告
// 现在需要对这两个函数进行封装，不需要改这两个函数，在调用api之后5s内如果没有拿到返回的promise，那就要调用warning。

function handleApiFetch() {
  return new Promise((resolve, reject) => {
    api().then(resolve);
    setTimeout(() => {
      reject();
      warning();
    }, 5000);
  });
}

function api() {
  return new Promise((resolve, reject) => {
    console.log("pending");

    reject();
  });
}

function warning() {
  console.log("warning");
}
