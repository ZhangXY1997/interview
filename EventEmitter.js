class EventEmitter {
  constructor() {
    this.events = {};
  }
  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback.apply(this, args);
      });
    }
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  off(eventName, callback) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      this.events[eventName] = callbacks.filter((c) => c !== callback);
    }
  }
}

const ee = new EventEmitter();
const callback = (count) => {
  console.log("click", count);
};
ee.on("click", callback);
ee.emit("click", 1);
ee.emit("click", 2);
ee.off("click", callback);
ee.emit("click", 3);
