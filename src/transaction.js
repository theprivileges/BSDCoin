module.exports = class Transaction {
    /**
     * Create a Transaction
     * @param {String} fromAddress The output address for a transaction
     * @param {String} toAddress The input address for a transaction
     * @param {Number} amount The amount spent in this transaction
     */
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress.toString();
        this.toAddress = toAddress.toString();
        this.amount = amount.toString();
    }

    /**
     * Get the amount spent in this transaction
     * 
     * @returns {Number}
     */
    getAmount() {
        return this.amount;
    }

    /**
     * Get the output address for this transaction
     * 
     * @returns {String}
     */
    getFromAddress() {
        return this.fromAddress;
    }

    /**
     * Get the input address for this transaction
     * 
     * @returns {String}
     */
    getToAddress() {
        return this.toAddress;
    }
}
