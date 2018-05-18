const Blockchain = require('./src/blockchain');
const Transaction = require('./src/transaction');

/**
 * @var {Blockchain}
 */
const bsdCoin = new Blockchain();

bsdCoin.createTransaction(new Transaction('address1', 'address2', 100));
bsdCoin.createTransaction(new Transaction('address2', 'address1', 50));

bsdCoin.minePendingTransactions('miner-address');
bsdCoin.minePendingTransactions('miner-address');

console.log('Balance of miner-address  is', bsdCoin.getBalanceOfAddress('miner-address'));
console.log('Blockchain', JSON.stringify(bsdCoin, null, 2));
