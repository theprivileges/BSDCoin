const crypto = require('crypto');

class Block {
    constructor(timestamp = Date.now(), transactions = [], previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = this.generateNonce();
        this.hash = this.calculateHash();
    }

    generateNonce(length = 32) {
        return crypto.randomBytes(length).toString('hex');
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
}