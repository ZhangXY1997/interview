function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    console.log(this);
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

setTimeout(function () {
  console.log(1);

  new Promise(function executor(resolve) {
    console.log(7);

    for (var i = 0; i < 10000; i++) {
      i === 9999 && resolve();
    }

    console.log(8);
  }).then(function () {
    console.log(9);
  });
}, 0);

setTimeout(function () {
  console.log(6);
}, 0);

new Promise(function executor(resolve) {
  console.log(2);

  for (var i = 0; i < 10000; i++) {
    i === 9999 && resolve();
  }

  console.log(3);
}).then(function () {
  console.log(4);
});

console.log(5);
