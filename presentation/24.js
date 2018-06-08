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

// Attempt to double spend
const rogueBlock = bsdCoin.chain[2];
const rogueTransactions = rogueBlock.getTransactions();
rogueTransactions[1].amount = 50;

// => Attempt to set a new hash on the modified Block
rogueBlock.hash = rogueBlock.calculateHash();

if (bsdCoin.isChainValid()) {
    console.log('✅ chain is valid.');
} else {
    console.log('❌ chain is not valid!');
}

// console.log(JSON.stringify(bsdCoin.chain, null, 2));