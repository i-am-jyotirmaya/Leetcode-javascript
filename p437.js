/**
 * https://leetcode.com/problems/path-sum-iii
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    if(!root) return 0;
    let paths = 0;
    const prefixes = new Map();
    prefixes.set(0, 1);

    const dfs = (node, sum) => {
        sum += node.val;
        paths += prefixes.get(sum - targetSum) ?? 0;
        prefixes.set(sum, 1 + (prefixes.get(sum) ?? 0));

        if (node.left) dfs(node.left, sum);
        if (node.right) dfs(node.right, sum);

        prefixes.set(sum, prefixes.get(sum) - 1);
    }

    dfs(root, 0);

    return paths;
};

class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function arrayToTreeNode(arr) {
    if (!arr || arr.length === 0) return null; // Handle empty or null array

    // Helper function to construct tree recursively
    const buildTree = (index) => {
        if (index >= arr.length || arr[index] === null) return null; // Out of bounds or null value

        // Create the current node
        const node = new TreeNode(arr[index]);

        // Recursively build left and right subtrees
        node.left = buildTree(2 * index + 1); // Left child index
        node.right = buildTree(2 * index + 2); // Right child index

        return node;
    };

    return buildTree(0); // Start from the root
}

console.log(pathSum(arrayToTreeNode([5,4,8,11,null,13,4,7,2,null,null,5,1]), 22))