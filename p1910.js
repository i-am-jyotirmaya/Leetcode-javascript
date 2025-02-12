/**
 * https://leetcode.com/problems/remove-all-occurrences-of-a-substring
 */

/**
 * Below approach uses stack
 */
/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
var removeOccurrences = function(s, part) {
    const stack = [];

    const check = () => {
        let stackIndex = stack.length - 1;
        for(let i = part.length - 1; i >= 0; i--) {
            if(stack[stackIndex--] !== part[i]) {
                return false;
            }
        }

        return true;
    }

    for(let i = 0; i < s.length; i++) {
        stack.push(s[i]);
        if(stack.length >= part.length && check(i)) {
            for(let i = 0; i < part.length; i++) {
                stack.pop();
            }
        }
    }

    return stack.join('');
};

const inputs = [
    ["daabcbaabcbc", "abc"],
    ["axxxxyyyyb", "xy"]

];

for(const [s, p] of inputs) {
    console.log(`Input = ${JSON.stringify([s, p])}\nOutput = ${JSON.stringify(removeOccurrences(s, p))}`);
}