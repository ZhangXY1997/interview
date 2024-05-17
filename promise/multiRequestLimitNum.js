// 限制请求最大数
function multiRequestLimitNum(reqArr, limitNum = 2) {
  return new Promise((resolve, reject) => {
    let result = new Array(reqArr.length);
    let start = 0;
    let finishcount = 0;
    function request(i) {
      reqArr[i]()
        .then((res) => {
          result[i] = res;
        })
        .catch((err) => {
          result[i] = err;
        })
        .finally(() => {
          finishcount++;
          if (finishcount === reqArr.length) {
            resolve(result);
          } else if (start < reqArr.length) {
            request(start);
            start++;
          }
        });
    }
    for (; start < limitNum; start++) {
      request(start);
    }
  });
}

function req(res, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, delay);
  });
}
multiRequestLimitNum(
  [
    req.bind(null, 1, 1000),
    req.bind(null, 2, 4000),
    req.bind(null, 3, 2000),
    req.bind(null, 4, 100),
  ],
  2
).then((res) => console.log(res));
