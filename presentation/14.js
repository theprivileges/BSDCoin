const Block = require('../src/block');

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

    /**
     * Append the block chain with a new Block
     * @param {Block} block 
     * @return void
     */
    addBlock(block) {
        this.chain.push(block);
    }

    /**
     * Add a new Transaction to pendingTransactions array
     * @param {Transaction} transaction 
     * @return void
     */
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
}