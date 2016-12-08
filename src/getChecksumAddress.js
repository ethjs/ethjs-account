const elliptic = require('elliptic');
const sha3 = require('ethjs-sha3');
const secp256k1 = new (elliptic.ec)('secp256k1'); // eslint-disable-line

/**
 * Get the checksum address of a address value
 *
 * @method getChecksumAddress
 * @param {String} addressInput
 * @returns {String} output hex string value
 */

module.exports = function getChecksumAddress(addressInput) {
  var address = addressInput; // eslint-disable-line

  if (typeof(address) !== 'string' || !address.match(/^0x[0-9A-Fa-f]{40}$/)) {
    throw new Error(`[ethjs-account] invalid address value ${JSON.stringify(address)} not a valid hex string`);
  }

  address = address.substring(2).toLowerCase();
  const hashed = sha3(address, true);

  address = address.split('');
  for (var i = 0; i < 40; i += 2) { // eslint-disable-line
    if ((hashed[i >> 1] >> 4) >= 8) {
      address[i] = address[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 0x0f) >= 8) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }

  return `0x${address.join('')}`;
};
