Array.prototype.mySort = function(fn) {
    const arr = [...this];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (fn(arr[i], arr[j]) < 0) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

console.log([3, 4, 5, 1, 2].mySort((a, b) => a - b));
console.log([3, 4, 5, 1, 2].mySort((a, b) => b - a));
