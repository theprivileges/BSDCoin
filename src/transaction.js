module.exports = class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    getAmount() {
        return this.amount;
    }

    getFromAddress() {
        return this.fromAddress;
    }

    getToAddress() {
        return this.toAddress;
    }
}
