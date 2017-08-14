const elliptic = require('elliptic');
const sha3 = require('ethjs-sha3');
const randomhex = require('randomhex');
const secp256k1 = new (elliptic.ec)('secp256k1'); // eslint-disable-line
const getChecksumAddress = require('./getChecksumAddress.js');
const stripHexPrefix = require('strip-hex-prefix');


/**
 * Get the address from a public key
 *
 * @method getAddress
 * @param {String} addressInput
 * @returns {String} output the string is a hex string
 */

function getAddress(addressInput) {
  var address = addressInput; // eslint-disable-line
  var result = null; // eslint-disable-line

  if (typeof(address) !== 'string') { throw new Error(`[ethjs-account] invalid address value ${JSON.stringify(address)} not a valid hex string`); }

  // Missing the 0x prefix
  if (address.substring(0, 2) !== '0x' &&
      address.substring(0, 2) !== 'XE') { address = `0x${address}`; }

  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    result = getChecksumAddress(address);

    // It is a checksummed address with a bad checksum
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      throw new Error('[ethjs-account] invalid address checksum');
    }

  // Maybe ICAP? (we only support direct mode)
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    throw new Error('[ethjs-account] ICAP and IBAN addresses, not supported yet..');

    /*
    // It is an ICAP address with a bad checksum
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      throw new Error('invalid address icap checksum');
    }

    result = (new BN(address.substring(4), 36)).toString(16);
    while (result.length < 40) { result = '0' + result; }
    result = getChecksumAddress('0x' + result);
    */
  } else {
    throw new Error(`[ethjs-account] invalid address value ${JSON.stringify(address)} not a valid hex string`);
  }

  return result;
}

/**
 * Returns the public key for this private key.
 *
 * @method privateToPublic
 * @param {String} privateKey a valid private key hex
 * @returns {Object} publicKey the sepk 160 byte public key for this private key
 */

function privateToPublic(privateKey) {
  if (typeof privateKey !== 'string') { throw new Error(`[ethjs-account] private key must be type String, got ${typeof(privateKey)}`); }
  if (!privateKey.match(/^(0x)?[0-9a-fA-F]{64}$/)) { throw new Error('[ethjs-account] private key must be an alphanumeric hex string that is 32 bytes long.'); }

  const privateKeyBuffer = new Buffer(stripHexPrefix(privateKey), 'hex');
  return (new Buffer(secp256k1.keyFromPrivate(privateKeyBuffer).getPublic(false, 'hex'), 'hex')).slice(1);
}

/**
 * Returns the Ethereum standard address of a public sepk key.
 *
 * @method publicToAddress
 * @param {Object} publicKey a single public key Buffer object
 * @returns {String} address the 20 byte Ethereum address
 */

function publicToAddress(publicKey) {
  if (!Buffer.isBuffer(publicKey)) { throw new Error('[ethjs-account] public key must be a buffer object in order to get public key address'); }

  return getAddress(sha3(publicKey, true).slice(12).toString('hex'));
}

/**
 * Returns an Ethereum account address, private and public key based on the public key.
 *
 * @method privateToAccount
 * @param {String} privateKey a single string of entropy longer than 32 chars
 * @returns {Object} output the Ethereum account address, and keys as hex strings
 */

function privateToAccount(privateKey) {
  const publicKey = privateToPublic(privateKey, true);

  return {
    privateKey: `0x${stripHexPrefix(privateKey)}`,
    publicKey: `0x${publicKey.toString('hex')}`,
    address: publicToAddress(publicKey),
  };
}

/**
 * Create a single Ethereum account address, private and public key.
 *
 * @method generate
 * @param {String} entropy a single string of entropy longer than 32 chars
 * @returns {Object} output the Ethereum account address, and keys
 */

function generate(entropy) {
  if (typeof entropy !== 'string') { throw new Error(`[ethjs-account] while generating account, invalid input type: '${typeof(entropy)}' should be type 'String'.`); }
  if (entropy.length < 32) { throw new Error(`[ethjs-account] while generating account, entropy value not random and long enough, should be at least 32 characters of random information, is only ${entropy.length}`); }

  return privateToAccount(sha3(`${randomhex(16)}${sha3(`${randomhex(32)}${entropy}`)}${randomhex(32)}`));
}

// exports
module.exports = {
  sha3,
  generate,
  getAddress,
  privateToAccount,
  getChecksumAddress,
  publicToAddress,
  privateToPublic,
};
