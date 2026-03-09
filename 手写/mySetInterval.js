// 用setTimeout实现setInterval
function mySetInterval(fn, time) {
    let timer;
    function helper() {
        fn();
        // 需要引入一个标记，让回调函数内部停止自己
        if (timer) {
            timer = setTimeout(helper, time)
        }
    }
    timer = setTimeout(helper, time);
    return {
        clear: function () {
            clearTimeout(timer);
            timer = null;
        }
    }
}

// --- 测试用例 ---
// 开启定时器
const timer = mySetInterval(() => { console.log('每秒执行一次', new Date().getSeconds()); }, 1000);
// 5秒后停止
setTimeout(() => { console.log('停止定时器'); timer.clear(); }, 5500);