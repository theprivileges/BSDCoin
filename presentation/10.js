class Blockchain {
    /**
     * Create a simple block chain 
     * @prop {Array.<Block>} chain The current chain of valid blocks
     * @prop {Number} difficulty The target difficulty, used to enforce proof-of-work
     * @prop {Array.<Transaction>} pendingTransactions List of Transactions yet to be mined
     * @prop {Number} miningReward Reward given to miners for doing the work.
     */
    constructor() {
        this.chain = []; // Genesis Block?
        this.difficulty = 3; // Difficulty ?
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
}