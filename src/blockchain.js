const Block = require('./block');
const Transaction = require('./transaction');

module.exports = class Blockchain {
    /**
     * Create a Blockchain
     * @typedef {Blockchain} Blockchain
     * @prop {Array} chain The current chain of valid blocks
     * @prop {Number} difficulty The target difficulty, used to enforce proof-of-work
     * @prop {Array} pendingTransactions List of Transactions yet to be mined
     * @prop {Number} miningReward Reward given to miners for doing the work.
     */
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    /**
     * Generate the Genesis Block for this blockchain
     *
     * @return {Block} the genesis block
     */
    createGenesisBlock() {
        return new Block(Date.parse('2018-06-09'), [], '0');
    }

    /**
     * Get the lastest block on this blockchain
     *
     * @return {Block} the last block on the blockchain
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Push a new Block onto the end of the Blockchain
     *
     * @param {Block} block
     */
    addBlock(block) {
        this.chain.push(block);
    }

    /**
     * Resets the pending transactions array to an empty array.  This is to be called after a block has been
     * successfully mined.
     */
    resetPendingTransactions() {
        this.pendingTransactions = [];
    }

    /**
     * Given a miner address, attempt to mine the pending transactions and adding a block to the blockchain.
     * This generates a new pending transaction rewarding the miner for their work.
     *
     * @param {String} miningRewardAddress
     */
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        this.addBlock(block);
        this.resetPendingTransactions();
        const reward = new Transaction('', miningRewardAddress, this.miningReward);
        this.createTransaction(reward);
    }

    /**
     * Append a new Transaction to the list of pending transactions to be mined next.
     *
     * @param {Transaction} transaction
     */
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    /**
     * Calculate the balance of a given address by traversing all of the transactions
     * associated with the given address
     *
     * @param {String} address the public address in question
     * @return {String} the balance of a given address
     */
    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.getTransactions()) {
                if (trans.getFromAddress() === address) {
                    balance -= trans.getAmount();
                }

                if (trans.getToAddress() === address) {
                    balance += trans.getAmount();
                }
            }
        }

        return balance;
    }

    /**
     * Calculates wheter or not the Blockchain has been tempered with by validating the hashs of each block on
     * the Blockchain
     *
     * @return {Boolean}
     */
    isChainValid() {
        const chainLenght = this.chain.length;
        // skip the genesis block
        for (let i = 1; i < chainLenght; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // test if current block has not been tempered with
            if (currentBlock.getHash() !== currentBlock.calculateHash()) {
                return false;
            }
            // check if current block links to the preview block
            if (currentBlock.getPreviousHash() !== previousBlock.getHash()) {
                return false;
            }
        }
        // for our purpose this chain is said to be valid.
        return true;
    }
};
