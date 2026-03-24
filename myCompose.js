/**
 * 洋葱模型核心引擎
 * @param {Array<Function>} middlewares - 中间件函数数组
 * @returns {Function} 返回一个接收 context 的执行函数
 */
function compose(middlewares) {
    // 1. 参数类型校验
    if (!Array.isArray(middlewares)) throw new TypeError('Middleware stack must be an array!');
    for (const fn of middlewares) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
    }

    // 2. 返回闭包执行器
    return function (context, next) {
        // 游标：记录当前执行到的中间件索引，用于防止多次调用 next()
        let index = -1;

        // 从第一个中间件（索引 0）开始启动
        return dispatch(0);

        // 3. 核心派发器（递归遍历）
        function dispatch(i) {
            // 【防御机制】如果在一个中间件里多次调用 next()，直接报错
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;

            // 获取当前要执行的中间件
            let fn = middlewares[i];

            // 如果队列执行完毕，将 next 赋值给 fn（通常为 undefined，作为递归终止条件）
            if (i === middlewares.length) fn = next;

            // 递归终止：返回一个 resolved 状态的 Promise，开始“由内向外”执行 await next() 后面的代码
            if (!fn) return Promise.resolve();

            try {
                // 【核心灵魂】
                // 执行当前中间件 fn，传入上下文 context。
                // 并把 dispatch.bind(null, i + 1) 作为第二个参数（即 next 函数）传给它。
                // 使用 Promise.resolve 包装执行结果，兼容异步和同步中间件。
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                // 捕获同步错误，抛出 rejected Promise
                return Promise.reject(err);
            }
        }
    };
}
