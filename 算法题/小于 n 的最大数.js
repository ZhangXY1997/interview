// 数组A中给定可以使用的1~9的数，返回由A数组中的元素组成的小于n的最大数。
// 示例 1：A={1, 2, 9, 4}，n=2533，返回 2499。
// 示例 2：A={1, 2, 5, 4}，n=2543，返回 2542。
// 示例 3：A={1, 2, 5, 4}，n=2541，返回 2525。
// 示例 4：A={1, 2, 9, 4}，n=2111，返回 1999。
// 示例 5：A={5, 9}，n=5555，返回 999。
function getMaxLessThanN(nums, n) {
    const nList = (n + '').split('');
    const sortNums = nums.sort((a, b) => a - b);
    const result = [];
    let i = 0;
    // 优先寻找一样的数字
    while (i < nList.length) {
        const temp = Number(nList[i]);
        if (sortNums.includes(temp)) {
            i++;
            result.push(temp);
        } else {
            break;
        }
    }
    // 到这里会有两种情况，1. 没有完全匹配 2. 完全匹配 n
    // 开始回溯
    while (i >= 0) {
        if (i === nList.length) {
            i--;
            continue;
        }
        const temp = Number(nList[i]);
        if (i < result.length) {
            result.pop();
        }
        let findNew = -1;
        for (let k = sortNums.length; k >= 0; k--) {
            if (sortNums[k] < temp) {
                findNew = sortNums[k];
                break;
            }
        }
        if (findNew != -1) {
            result.push(findNew);
            while (result.length < nList.length) {
                result.push(sortNums[sortNums.length - 1]);
            }
            return Number(result.join(''));
        } else {
            i--;
        }
    }
    return Number((new Array(nList.length - 1).fill(sortNums[sortNums.length - 1])).join(''))
}

console.log(getMaxLessThanN([1, 2, 4, 9], 2533)); // 预期: 2499
console.log(getMaxLessThanN([1, 2, 5, 4], 2543)); // 预期: 2542
console.log(getMaxLessThanN([1, 2, 5, 4], 2541)); // 预期: 2525 (回溯案例)
console.log(getMaxLessThanN([1, 2, 9, 4], 2111)); // 预期: 1999 (位数减少)
console.log(getMaxLessThanN([5, 9], 5555));       // 预期: 999  (完全匹配后回溯失败 -> 降位)