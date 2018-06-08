const crypto = require('crypto');
const Blockchain = require('./src/blockchain');
const Transaction = require('./src/transaction');

// Hypothetical interaction between nodes on the network

// Setting up wallet addresses using Elliptic Curve Diffie-Hellman (ECDH)
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

// A miner joins the network
bsdCoin.minePendingTransactions(minerAddress);

// miner pays bob for some widget
bsdCoin.createTransaction(new Transaction(minerAddress, bobAddress, 100));

// bob pays alice for some service
bsdCoin.createTransaction(new Transaction(bobAddress, aliceAddress, 50));

// miner attempts to solve puzzle again
bsdCoin.minePendingTransactions(minerAddress);

const minerBalance = bsdCoin.getBalanceOfAddress(minerAddress);
const bobBalance = bsdCoin.getBalanceOfAddress(bobAddress);
const aliceBalance = bsdCoin.getBalanceOfAddress(aliceAddress);

console.log('Balance of miner\'s wallet is', minerBalance);
console.log('Balance of bob\'s wallet is', bobBalance);
console.log('Balance of alice\'s wallet is', aliceBalance);
console.log('Blockchain', JSON.stringify(bsdCoin.chain, null, 2));
