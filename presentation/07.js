const crypto = require('crypto'); //https://devdocs.io/node~8_lts/crypto

class Block {
    /**
     * Create a Block
     * @param {String} timestamp The time approximate creation time of this Block
     * @param {Array} transactions List of Transactions stored in this Block
     * @param {String} previousHash A reference to the hash of the previous (parent) block in the chain
     */
    constructor(timestamp = Date.now(), transactions = [], previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = this.generateNonce();
        //this.hash;
    }

    /**
     * Generate a random value so that the hash of the block will contain a run of leading zeroes.
     *
     * @param {Number} length (optional) the bit size of the nonce
     * @return {String}
     */
    generateNonce(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
}