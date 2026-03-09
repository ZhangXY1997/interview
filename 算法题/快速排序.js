/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    // 快速排序
    quickSort(nums, 0, nums.length - 1);
    return nums;
};

function quickSort(nums, left, right) {
    if (left >= right) return;
    let pivotIndex = partition(nums, left, right);
    console.log(pivotIndex)
    quickSort(nums, left, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, right);
}

function partition(nums, left, right) {
    let pivot = nums[left];
    let pivotIndex = left;
    while (left < right) {
        while (right > left && nums[right] >= pivot) {
            right--;
        }
        while (right > left && nums[left] <= pivot) {
            left++;
        }
        swap(nums, left, right);
    }
    swap(nums, pivotIndex, left);
    return left;
}

function swap(nums, a, b) {
    let temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
}



console.log(sortArray([5, 2, 3, 1]));