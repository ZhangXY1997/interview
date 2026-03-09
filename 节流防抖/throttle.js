function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    if (currentTime - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = currentTime;
    }
  };
}

function test() {
  console.log(this.a);
}

const obj = { a: 1 };

const throttleFn = throttle(test, 1000);
throttleFn.apply(obj, [1, 2, 3]);
