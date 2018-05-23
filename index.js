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

/**
 * @var {String} minerBalance The balance of the miner-address
 */
const minerBalance = bsdCoin.getBalanceOfAddress('miner-address');

console.log('Balance of miner-address  is', minerBalance);
console.log('Blockchain', JSON.stringify(bsdCoin, null, 2));
