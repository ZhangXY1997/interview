class Person {
  constructor(brain) {
    this.brain = brain;
  }
}
class JoestarFamily extends Person {
  constructor(name) {
    super("smart");
    this.name = name;
  }
}
var johnny = new JoestarFamily("johnny");

// 组合继承
function Parent() {
  this.name = "parent";
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {
  Parent.call(this); // 第二次调用 Parent3()
  this.type = "child3";
}
// 第一次调用Parent3()，子类原型继承父类原型
Child.prototype = Object.create(Parent.prototype);
//手动挂上构造器,指向自己的构造函数
Child.prototype.constructor = Child;
var s3 = new Child();

var s4 = new Child();

//不互相影响
console.log(s3.getName()); //正常输出'parent3'
console.log(s4.getName()); //正常输出'parent3"
// 构造函数 A 与 构造函数 B 并没有继承关系，即构造函数 B 没有继承构造函数 A 上面的属性，
