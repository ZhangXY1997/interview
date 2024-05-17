Function.prototype.myCall = function (thisArg, ...args) {
	if (typeof this !== "function") {
		throw new Error("Function.prototype.myCall - what is trying to be bound is not callable");
	}
  thisArg = Object(thisArg || window); // 处理原始值(数字，字符串，布尔值)
  let fn = Symbol(); // 使用 symbol 使 fn 属性不会重复
  thisArg[fn] = this;
  var result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
}

Function.prototype.myApply = function (thisArg, arr) {
	if (typeof this !== "function") {
		throw new Error("Function.prototype.myApply - what is trying to be bound is not callable");
	}
	thisArg = Object(thisArg || window); 
	let fn = Symbol();
	thisArg[fn] = this;
	let result;
	if (Array.isArray(arr)) {
		result = thisArg[fn](...arr);
	} else {
		result = thisArg[fn]();
	}
	
	delete thisArg[fn];
	return result;
}

Function.prototype.myBind = function (thisArg, ...args) {
	if (typeof this !== "function") {
		throw new Error("Function.prototype.myBind - what is trying to be bound is not callable");
	}
	let self = this;
	let fn = function () {
		// 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fn.prototype = Object.create(self.prototype);`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
		// 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 thisArg
		return self.apply(this instanceof fn ? this : thisArg, [...args, ...arguments]);
	}
	// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
	// 为什么使用了 Object.create? 因为我们要防止，fn.prototype 的修改而导致 self.prototype 被修改。不要写成 fn.prototype = self.prototype; 这样可能会导致原函数的原型被修改。fn.prototype.value 修改时，self.prototype.value 也会被修改
	fn.prototype = Object.create(self.prototype);
	return fn;
}

var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}


console.log(bar.myCall(obj, 'kevin', 18));
console.log(bar.myCall(null, 'kevin', 18));

console.log(bar.call(obj, 'kevin', 18));
console.log(bar.call(null, 'kevin', 18));

console.log(bar.myApply(obj, ['kevin', 18]));
console.log(bar.myApply(null, ['kevin', 18]));

console.log(bar.apply(obj, ['kevin', 18]));
console.log(bar.apply(null, ['kevin', 18]));