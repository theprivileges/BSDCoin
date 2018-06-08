class Block {
    /**
     * Create a Block
     * @param {String} timestamp The time approximate creation time of this Block
     * @param {Array.<Transanction>} transactions List of Transactions stored in this Block
     * @param {String} previousHash A reference to the hash of the previous (parent) block in the chain
     */
    constructor(timestamp = Date.now(), transactions = [], previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = this.generateNonce(); // Nonce ?
        this.hash = this.calculateHash(); // calculateHash ?
    }
}