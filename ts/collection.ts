// 手写 type pick
//pick 的作用是从一个对象类型 T 中，挑选出几个指定的属性 K，从而组合成一个新的类型。
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};