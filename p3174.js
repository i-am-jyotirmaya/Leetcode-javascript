/**
 * https://leetcode.com/problems/clear-digits
 */

/**
 * @param {string} s
 * @return {string}
 */
var clearDigits = function(s) {
    const stack = [];
    for(const c of s) {
        if(!isNaN(+c)) {
            stack.pop();
        } else {
            stack.push(c);
        }
    }

    return stack.join('');
};