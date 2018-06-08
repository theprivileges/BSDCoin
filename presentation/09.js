const crypto = require('crypto');

class Block {
    constructor(
        timestamp = Date.now(),
        transactions = [],
        previousHash = ''
    ) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = this.generateNonce();
        this.hash = this.calculateHash();
    }

    generateNonce(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }

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
        const target = String('0').repeat(difficulty); // 000
        // Keep trying until hash starts with the target number
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce = this.generateNonce();
            this.hash = this.calculateHash();
        }
    }
}