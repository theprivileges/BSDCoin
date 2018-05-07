const crypto = require('crypto');

module.exports = class Block {
    constructor(timestamp = Date.now(), transactions = [], previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = this.generateNonce()
        this.hash = this.calculateHash();
    }

    /**
     * Generate the block's hash by building a sha256 hash combining all properties except the hash
     * @returns {string} HEX string of the data passed to be hashed
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
     * @param {int} difficulty 
     */
    mineBlock(difficulty) {
        console.time('Mining Block');
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce = this.generateNonce()
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: ", this.hash);
        console.timeEnd('Mining Block');
    }

    /**
     * Generate a random value so that the hash of the block will contain a run of leading zeroes.
     *
     * @param {int} length (optional) the bit size of the nonce
     */
    generateNonce(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
}
