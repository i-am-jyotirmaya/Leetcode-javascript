/**
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee
 */

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    let hold = -prices[0];
    let free = 0;

    for(let i = 1; i < prices.length; i++) {
        const tmp = hold;
        hold = Math.max(hold, free - prices[i]);
        free = Math.max(free, tmp + prices[i] - fee);
    }

    return free;
};