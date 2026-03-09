// [1,4,3,2,6,1,4,3] 找到两个数相加等于4
function func(arr, target) {
    const result = [];
    const map = {};

    for (let i = 0; i < arr.length; i++) {
        map[arr[i]] = map[arr[i]] ? [...map[arr[i]], i] : [i];

        let temp = target - arr[i];
        if (map[temp]) {
            for (let j = 0; j < map[temp].length; j++) {
                if (map[temp][j] !== i) {
                    result.push([temp, arr[i]]);
                }
                
            }
        }
    } 
    return result;
}

console.log(func([1,4,3,2,2,2,6,1,4], 4));

const dp = new Array(5).fill(false);
console.log(dp)