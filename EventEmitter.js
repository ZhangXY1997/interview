// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }
//   emit(eventName, ...args) {
//     const callbacks = this.events[eventName];
//     if (callbacks) {
//       callbacks.forEach((callback) => {
//         callback.apply(this, args);
//       });
//     }
//   }
//   on(eventName, callback) {
//     if (!this.events[eventName]) {
//       this.events[eventName] = [];
//     }
//     this.events[eventName].push(callback);
//   }
//   off(eventName, callback) {
//     const callbacks = this.events[eventName];
//     if (callbacks) {
//       this.events[eventName] = callbacks.filter((c) => c !== callback);
//     }
//   }
// }

// const ee = new EventEmitter();
// const callback = (count) => {
//   console.log("click", count);
// };
// ee.on("click", callback);
// ee.emit("click", 1);
// ee.emit("click", 2);
// ee.off("click", callback);
// ee.emit("click", 3);


// 2026.02.17

class EventBus {
  constructor() {
    //  如果是实现微前端通信总线，Bus 是全局唯一的（Singleton），通常挂载在 window 对象上。
    // if (window.__SHARED_EVENT_BUS__) {      
    //   return window.__SHARED_EVENT_BUS__;    
    // }
    this.events = {};
    // window.__SHARED_EVENT_BUS__ = this;
  }

  // 订阅事件
  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(callback);
  }

  // 发布时间
  emit(name, ...args) {
    if (this.events[name]) {
      const listeners = [...this.events[name]];
      listeners.forEach((callback) => {
        try {
          callback(...args);
        } catch(e) {
          console.error(e);
        } 
      })
    }
  }

  // 取消订阅
  off(name, callback) {
    if (this.events[name]) {
      this.events[name] = this.events[name].filter((c) => c !== callback && c.fn !== callback);
    }
  }

  // 只订阅一次
  once(name, callback) {
    
    const temp = (...args) => {
      callback(...args);
      this.off(name, temp);
    };
    temp.fn = callback;
    this.on(name, temp);
  }
}

const ee = new EventBus();
const callback = (count) => {
  console.log("click", count);
};
ee.once("click", callback);
ee.emit("click", 1);
ee.emit("click", 2);
ee.off("click", callback);
ee.emit("click", 3);