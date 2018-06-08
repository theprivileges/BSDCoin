const Block = require('../block');
const Transaction = require('../transaction');

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

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        this.addBlock(block);
        this.resetPendingTransactions();
        const reward = new Transaction('', miningRewardAddress, this.miningReward);
        this.createTransaction(reward);
    }

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

    isChainValid() {
        const chainLenght = this.chain.length;
        for (let i = 1; i < chainLenght; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.getHash() !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.getPreviousHash() !== previousBlock.getHash()) {
                return false;
            }
        }
        // for our purpose this chain is said to be valid.
        return true;
    }
}