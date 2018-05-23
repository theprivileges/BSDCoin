const crypto = require('crypto');

module.exports = class Block {
    /**
     * Create a Block
     * @param {Date} timestamp The time approximate creation time of this Block
     * @param {Array} transactions List of Transactions stored in this Block
     * @param {String} previousHash A reference to the hash of the previous (parent) block in the chain
     */
    constructor(timestamp = Date.now(), transactions = [], previousHash = '') {
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = this.generateNonce();
        this.hash = this.calculateHash();
    }

    /**
     * Generate the block's hash by building a sha256 hash combining all properties except the hash
     * @return {String} calculated digest of this block's properties
     */
    calculateHash() {
        const hash256 = crypto.createHash('sha256');
        hash256.update(this.previousHash, 'utf-8')
               .update(this.timestamp.toString(), 'utf-8')
               .update(JSON.stringify(this.transactions), 'utf-8')
               .update(this.nonce, 'utf-8');
        return hash256.digest('hex');
    }

    /**
     * Mine a block given a specified difficulty
     *
     * @param {Number} difficulty
     */
    mineBlock(difficulty) {
        console.time('Mining Block');
        const target = Array(difficulty + 1).join('0');
        // While the hash does not begin with the specified leading zeroes, keep trying
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce = this.generateNonce();
            this.hash = this.calculateHash();
        }
        console.log('BLOCK MINED: ', this.hash);
        console.timeEnd('Mining Block');
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

    /**
     * Get the hash of the parent block
     *
     * @return  {String}
     */
    getPreviousHash() {
        return this.previousHash;
    }

    /**
     * Get the list of transactions in this block
     *
     * @return {Array}
     */
    getTransactions() {
        return this.transactions;
    }

    /**
     * Get the hash of this block
     *
     * @return {String}
     */
    getHash() {
        return this.hash;
    }
};
