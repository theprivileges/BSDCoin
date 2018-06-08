class Transaction {
    /**
     * Create a Transaction
     * @param {String} fromAddress The output address for a transaction
     * @param {String} toAddress The input address for a transaction
     * @param {Number} amount The amount spent in this transaction
     */
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}