const Block = require('../src/block');
const Transaction = require('../src/transaction');

class Blockchain {
    constructor() {
        this.chain = [ this.createGenesisBlock() ];
        this.difficulty = 3; 
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.parse('2018-06-09'));
    }

    addBlock(block) {
        this.chain.push(block);
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    resetPendingTransactions() {
        this.pendingTransactions = [];
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
     * Given a miner address, attempt to mine the pending transactions and adding a block to the blockchain.
     * This generates a new pending transaction rewarding the miner for their work.
     *
     * @param {String} miningRewardAddress Address of the "wallet" that will be credited with creating a block
     */
    minePendingTransactions(miningRewardAddress) {
        // create new Block
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().getHash());
        // attempt to mine Block
        block.mineBlock(this.difficulty);
        // new Block is mined, add it to the chain
        this.addBlock(block);
        // Start fresh
        this.resetPendingTransactions();
        // Reward good players
        const reward = new Transaction('', miningRewardAddress, this.miningReward);
        this.createTransaction(reward);
    }
}