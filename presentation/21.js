const crypto = require('crypto');
const Blockchain = require('../src/blockchain');
const Transaction = require('../src/transaction');

const miner = crypto.createECDH('secp256k1');
miner.generateKeys();
const minerAddress = miner.getPublicKey('hex');
const alice = crypto.createECDH('secp256k1');
alice.generateKeys();
const aliceAddress = alice.getPublicKey('hex');
const bob = crypto.createECDH('secp256k1');
bob.generateKeys();
const bobAddress = bob.getPublicKey('hex');

const bsdCoin = new Blockchain();

bsdCoin.minePendingTransactions(minerAddress);
bsdCoin.createTransaction(new Transaction(minerAddress, bobAddress, 100));
bsdCoin.createTransaction(new Transaction(bobAddress, aliceAddress, 50));
bsdCoin.minePendingTransactions(minerAddress);
bsdCoin.createTransaction(new Transaction(minerAddress, bobAddress, 100));
bsdCoin.minePendingTransactions(minerAddress);

// => Attempt to double spend
const rogueTransactions = bsdCoin.chain[2].getTransactions();
rogueTransactions[1].amount = 50;

const minerBalance = bsdCoin.getBalanceOfAddress(minerAddress);
const bobBalance = bsdCoin.getBalanceOfAddress(bobAddress);
const aliceBalance = bsdCoin.getBalanceOfAddress(aliceAddress);

console.log('Balance of miner\'s wallet is', minerBalance); // should be 0
console.log('Balance of bob\'s wallet is', bobBalance); // should be 50
console.log('Balance of alice\'s wallet is', aliceBalance); // should be 50