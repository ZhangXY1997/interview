// pipe(handler1, handler2, handler3)(data) => handler3(handler2(handler1(data)))

function pipe(...args) {
    return function (params) {
        return args.reduce((a, b) => b(a), params)
    }
}

// 准备几个纯函数
const add10 = (x) => x + 10;
const double = (x) => x * 2;
const toString = (x) => `Result is ${x}`;

// 组装管道
// 顺序：x -> add10 -> double -> toString
const compute = pipe(add10, double, toString);

// 执行
const result = compute(5);

// 推导过程：
// 1. 5 + 10 = 15
// 2. 15 * 2 = 30
// 3. "Result is 30"
console.log(result); // 输出: "Result is 30"


// 等价于 Promise.resolve(initValue).then(f1).then(f2).then(f3);
function asyncPipe(...args) {
    return function (value) {
        return args.reduce((previous, current) => {
            return previous.then(current);
        }, Promise.resolve(value))
    }
}

// 更现代的写法

function asyncPipeNew(...args) {
    return async function (value) {
        let res = value;
        for (const fn of args) {
            res = await fn(res)
        }
        return res;
    }
}

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}
// 用法示例
const asyncTask = async (x) => {
    await sleep(1000);
    return x * 2;
};

const run = asyncPipeNew(add10, asyncTask, toString);
run(5).then(console.log); // 依然能正确串行执行
