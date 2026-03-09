let stateHooks = [];
let cursorIndex = 0;

function useState(initialValue) {
    const hookIndex = cursorIndex;

    stateHooks[hookIndex] = stateHooks[hookIndex] !== undefined ? stateHooks[hookIndex] : initialValue;

    function setState(newState) {
        if (newState instanceof Function) {
            stateHooks[hookIndex] = newState(stateHooks[hookIndex]);
        } else {
            stateHooks[hookIndex] = newState;
        }

        render();
    }
    cursorIndex++;
    return [stateHooks[hookIndex], setState]
}

function render() {
    // 每次渲染前，必须重置指针！这是 Hook 顺序必须固定的根本原因  
    currentCursor = 0;     
    // 执行组件（这里简化为直接调用函数，实际是 React 构建 Fiber 树）  
    const app = MyComponent();     
    // 模拟用户交互（为了演示效果）  
    return app;
}