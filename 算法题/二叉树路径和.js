// 二叉树路径和，到任意节点
function func(root) {
    const result = [];
    
    function helper(node, sum) {
        if (!node) {
            return;
        }
        sum = sum + node.val;
        result.push(sum);
        if (node.left) {
            helper(node.left, sum);
        }
        if (node.right) {
            helper(node.right, sum);
        }
    }

    helper(root, 0);
    return result;
}

const tree = {val: 1, left: {val: 2, left:{val:4}}, right: {val:3}}

console.log(func(tree))