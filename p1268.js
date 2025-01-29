/**
 * https://leetcode.com/problems/search-suggestions-system
 */

/**
 * There are three solutions to this, 
 * 1. Using a Prefix tree (Trie)
 * 2. Two pointers
 * 3. Binary search on prefix
 * 
 * This solution uses a Trie.
 */

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {
    
    const root = new TrieNode();

    // Build Trie
    for (const product of products) {
        let head = root;
        for (const char of product) {
            const charCode = char.charCodeAt(0) - "a".charCodeAt(0);
            if (!head.nodes[charCode]) {
                head.nodes[charCode] = new TrieNode();
            }
            head = head.nodes[charCode];
        }
        head.isWord = true;
    }

    // Helper function for DFS
    const dfs = (node, word, buff) => {
        if (buff.length === 3) return; // Stop after 3 suggestions
        if (node.isWord) {
            buff.push(word);
        }
        for (let i = 0; i < 26; i++) {
            if (node.nodes[i]) {
                dfs(node.nodes[i], word + String.fromCharCode(i + 97), buff);
            }
        }
    };

    const res = [];
    let head = root;
    let prefix = "";

    for (const char of searchWord) {
        const charCode = char.charCodeAt(0) - "a".charCodeAt(0);
        if (!head || !head.nodes[charCode]) {
            // Add empty suggestions for remaining prefixes
            while (res.length < searchWord.length) {
                res.push([]);
            }
            break;
        }
        
        prefix += char;
        const buff = [];
        dfs(head.nodes[charCode], prefix, buff);
        res.push(buff);
        head = head.nodes[charCode];
    }

    return res;
};

class TrieNode {
    constructor() {
        this.isWord = false;
        this.nodes = Array(26);
    }
}



console.log(suggestedProducts(["mobile","mouse","moneypot","monitor","mousepad"], "mouse"))