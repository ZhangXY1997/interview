// 写法 1: 极简箭头函数
function createNested(array) {
    return array.reduceRight((previous, current) => ({[current]: previous}), null)
}

// 测试
const keys = ['a', 'b', 'c', 'd'];
console.log(JSON.stringify(createNested(keys), null, 2));
