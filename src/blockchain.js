const Block = require('./block');
const Transaction = require('./transaction');

module.exports = class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    /**
     * Generate the Genesis Block for this blockchain
     * 
     * @returns {Block} the genesis block
     */
    createGenesisBlock() {
        return new Block(Date.parse("2018-06-09"), [], "0");
    }

    /**
     * Get the lastest block on this blockchain
     * 
     * @returns {Block} the last block on the blockchain
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
     * @param {string} miningRewardAddress 
     */
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        this.addBlock(block);
        this.resetPendingTransactions();
        const reward = new Transaction(null, miningRewardAddress, this.miningReward)
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
     * @param {string} address the public address in question
     * @returns {string} the balance of a given address
     */
    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    /**
     * Calculates wheter or not the Blockchain has been tempered with by validating the hashs of each block on
     * the Blockchain
     * 
     * @returns {boolean}
     */
    isChainValid() {
        // skip the genesis block
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
