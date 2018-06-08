const Block = require('../src/block');

class Blockchain {
    constructor() {
        this.chain = [ this.createGenesisBlock() ];
        this.difficulty = 3; // Difficulty ?
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.parse('2018-06-09'));
    }
}