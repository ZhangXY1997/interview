/**
 * 通用 Generator 迭代器工厂
 * @param {Function} stepsFn - 接收 emit 函数，调用 emit(value) 相当于 yield value
 * @returns {Iterator} 符合迭代器协议的对象
 */
function createIterator(stepsFn) {
    // 用数组模拟 yield 队列
    const yieldedValues = [];
    let returnValue = undefined;
    let isFinished = false;
    let cursor = 0;

    // ---- 收集阶段 ----
    // emit 相当于 yield，调用 emit(val) 就是把值 push 进队列
    const receivedInputs = []; // 记录每次 .next(val) 传入的值

    // 我们用"同步预执行"来收集所有 yield 值
    // 注意：这种方式只适合模拟无副作用的同步 yield，真正的 Generator 是懒执行的
    const emit = (value) => {
        yieldedValues.push(value);
    };

    returnValue = stepsFn(emit, receivedInputs);
    isFinished = false;

    return {
        next(externalValue) {
            if (cursor < yieldedValues.length) {
                receivedInputs[cursor] = externalValue;
                return { value: yieldedValues[cursor++], done: false };
            } else {
                if (!isFinished) {
                    isFinished = true;
                    return { value: returnValue, done: true };
                }
                return { value: undefined, done: true };
            }
        },

        // 让迭代器本身也符合可迭代协议（Iterable Protocol）
        // 这样就可以被 for...of 遍历
        [Symbol.iterator]() {
            return this;
        }
    };
}

// --- 使用 ---
const iter = createIterator((emit) => {
    emit(10);  // 相当于 yield 10
    emit(20);  // 相当于 yield 20
    emit(30);  // 相当于 yield 30
    return 'finished'; // 相当于 return
});

console.log(iter.next()); // { value: 10, done: false }
console.log(iter.next()); // { value: 20, done: false }
console.log(iter.next()); // { value: 30, done: false }
console.log(iter.next()); // { value: 'finished', done: true }
console.log(iter.next()); // { value: undefined, done: true }

// 支持 for...of（因为实现了 Symbol.iterator）
for (const val of createIterator((emit) => { emit(1); emit(2); emit(3); })) {
    console.log(val); // 依次打印 1, 2, 3
}
