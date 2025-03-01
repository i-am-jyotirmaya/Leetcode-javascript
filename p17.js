/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) return [];

  const alphabets = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  const len = digits.length;

  const wordList = [];

  const buildWord = (currDigitIndex, word) => {
    if (word.length === len) {
      wordList.push(word);
      return;
    }

    const currDigit = +digits[currDigitIndex];

    for (const char of alphabets[currDigit]) {
      buildWord(currDigitIndex + 1, word + char);
    }
  };

  buildWord(0, "");

  return wordList;
};
