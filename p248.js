/**
 * https://leetcode.com/problems/strobogrammatic-number-iii
 */

/**
 * Here we are generating the numbers instead of iterating from low to high as majority of number
 * among them will not be strobogrammatic.
 */

/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
var strobogrammaticInRange = function(low, high) {
    const pairs = [['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6']];
    let count = 0;

    const isInRange = (num) => {
        if (num.length > high.length || (num.length === high.length && num > high)) return false;
        if (num.length < low.length || (num.length === low.length && num < low)) return false;
        return true;
    };

    const generate = (current, left, right) => {
        if (left > right) {
            let numStr = current.join('');
            if (isInRange(numStr)) {
                count++;
            }
            return;
        }

        for (let [first, second] of pairs) {
            if (left === 0 && first === '0' && right !== 0) continue; // Avoid leading zeros
            if (left === right && first !== second) continue; // Middle character must be self-mirroring

            current[left] = first;
            current[right] = second;
            generate(current, left + 1, right - 1);
        }
    };

    for (let len = low.length; len <= high.length; len++) {
        generate(Array(len), 0, len - 1);
    }

    return count;
};
