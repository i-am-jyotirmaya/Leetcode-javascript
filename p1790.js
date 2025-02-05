/**
 * https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function(s1, s2) {
    if(s1 === s2) return true;
    if(s1.length !== s2.length) {
        return false;
    }
    let diffCount = 0;
    let diffIndex1 = -1, diffIndex2 = -1;
    for(let i = 0; i < s1.length; i++) {
        if(s1[i] !== s2[i]) {
            if(diffCount === 0) {
                diffCount++;
                diffIndex1 = i;
            } else if(diffCount === 1) {
                diffCount++;
                diffIndex2 = i;
                if(!(s1[diffIndex1] === s2[diffIndex2]) || !(s1[diffIndex2] === s2[diffIndex1])) {
                    return false;
                }
            } else {
                return false;
            }
            
        }
    }
    if(diffCount > 0 && diffCount !== 2) {
        return false;
    }
    return true;
};

const inputs = [
    ["bank", "kanb"],
    ["attack", "defend"],
    ["kelb", "kelb"],
    ["aa", "ac"]
]

for(const [s1, s2] of inputs) {
    console.log(`Input: s1 = ${s1}, s2 = ${s2}, output = \n${areAlmostEqual(s1, s2)}`);
}