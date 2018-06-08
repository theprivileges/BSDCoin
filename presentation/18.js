const crypto = require('crypto');

// Hypothetical interaction between nodes on the network

// Setting up wallet addresses using Elliptic Curve Diffie-Hellman (ECDH)
// @see https://devdocs.io/node~8_lts/crypto#crypto_crypto_createecdh_curvename
const miner = crypto.createECDH('secp256k1');
miner.generateKeys();
const minerAddress = miner.getPublicKey('hex');

const alice = crypto.createECDH('secp256k1')
alice.generateKeys();
const aliceAddress = alice.getPublicKey('hex');

const bob = crypto.createECDH('secp256k1');
bob.generateKeys();
const bobAddress = bob.getPublicKey('hex');