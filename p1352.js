/**
 * https://leetcode.com/problems/product-of-the-last-k-numbers
 */

var ProductOfNumbers = function () {
  this.prefixProd = [1];
};

/**
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function (num) {
  if (num === 0) {
    this.prefixProd = [1];
  } else {
    this.prefixProd.push(num * this.prefixProd[this.prefixProd.length - 1]);
  }
};

/**
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function (k) {
  if (k >= this.prefixProd.length) {
    return 0;
  }

  return (
    this.prefixProd[this.prefixProd.length - 1] / this.prefixProd[this.prefixProd.length - 1 - k]
  );
};
