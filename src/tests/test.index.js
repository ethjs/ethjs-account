const assert = require('chai').assert;
const sha3 = require('ethjs-sha3');
const generate = require('../index.js').generate;
const getAddress = require('../index.js').getAddress;
const getChecksumAddress = require('../index.js').getChecksumAddress;
const privateToAccount = require('../index.js').privateToAccount;
const privateToPublic = require('../index.js').privateToPublic;
const publicToAddress = require('../index.js').publicToAddress;
const crypto = require('crypto');
const ethUtil = require('ethereumjs-util');
const SandboxedModule = require('sandboxed-module');

SandboxedModule.registerBuiltInSourceTransformer('istanbul');
const invalidGetAddress = SandboxedModule.require('../index.js', {
  requires: {
    './getChecksumAddress.js': (addr) => addr + 1,
  },
  singleOnly: true,
}).getAddress;

describe('ethjs-account', () => {
  describe('privateToAccount', () => {
    it('should construct properly', () => {
      assert.equal(typeof privateToAccount, 'function');
    });

    it('should be the same as ethereumjs-util', () => {
      const privateKey = '0xccb36826fbd5192c10bba496af42906a7e3b91f87a0ae803e79113fa88c5432c';
      const accountTest = privateToAccount(privateKey);
      const publicKey = new Buffer(accountTest.publicKey.slice(2), 'hex');
      const address = accountTest.address.toLowerCase();

      assert.deepEqual(publicKey, privateToPublic(privateKey));
      assert.equal(address.toLowerCase(), `0x${ethUtil.privateToAddress(new Buffer(privateKey.slice(2), 'hex')).toString('hex')}`);
      assert.deepEqual(publicKey, ethUtil.privateToPublic(new Buffer(privateKey.slice(2), 'hex')));
      assert.equal(publicToAddress(publicKey).toLowerCase(), `0x${ethUtil.publicToAddress(accountTest.publicKey, true).toString('hex')}`);
    });

    it('should throw under invalid conditions', () => {
      assert.throws(() => privateToAccount(''), Error);
      assert.throws(() => privateToAccount('0x'), Error);
      assert.throws(() => privateToAccount({}), Error);
      assert.throws(() => privateToAccount(null), Error);
      assert.throws(() => privateToAccount(''), Error);
    });

    it('should prodice the same keys given a prefixed and non prefixed private key', () => {
      const privateKey = '0xccb36826fbd5192c10bba496af42906a7e3b91f87a0ae803e79113fa88c5432c';
      const privateKey2 = 'ccb36826fbd5192c10bba496af42906a7e3b91f87a0ae803e79113fa88c5432c';
      assert.deepEqual(privateToPublic(privateKey2), privateToPublic(privateKey));
      assert.deepEqual(privateToAccount(privateKey2), privateToAccount(privateKey));
    });

    it('should function normally', () => {
      const testAccount = privateToAccount(sha3('sfddskj'));

      assert.equal(typeof testAccount, 'object');
      assert.equal(typeof testAccount.privateKey, 'string');
      assert.equal(typeof testAccount.publicKey, 'string');
      assert.equal(typeof testAccount.address, 'string');
      assert.equal(Object.keys(testAccount).length, 3);
      assert.equal(testAccount.privateKey.length, 66);
      assert.equal(testAccount.publicKey.length, 130);
      assert.equal(testAccount.address.length, 42);
    });
  });

  describe('privateToPublic', () => {
    it('should construct properly', () => {
      assert.equal(typeof privateToPublic, 'function');
      assert.equal(typeof privateToPublic(sha3('jksfksf')), 'object');
    });

    it('should throw under invalid conditions', () => {
      assert.throws(() => privateToPublic(''), Error);
      assert.throws(() => privateToPublic('0x'), Error);
      assert.throws(() => privateToPublic({}), Error);
      assert.throws(() => privateToPublic(null), Error);
      assert.throws(() => privateToPublic(42323424342), Error);
      assert.throws(() => privateToPublic(''), Error);
    });
  });

  describe('publicToAddress', () => {
    it('should construct properly', () => {
      assert.equal(typeof publicToAddress, 'function');
      assert.equal(typeof publicToAddress(privateToPublic(sha3('jksfksf'))), 'string');
    });

    it('should be the same as ethereumjs-util', () => {
      const accountTest = privateToAccount(sha3('kjsdfkjfkjsf'));
      const publicKey = new Buffer(accountTest.publicKey.slice(2), 'hex');

      assert.equal(publicToAddress(publicKey).toLowerCase(), `0x${ethUtil.publicToAddress(accountTest.publicKey, true).toString('hex')}`);
    });

    it('should throw under invalid conditions', () => {
      assert.throws(() => publicToAddress(''), Error);
      assert.throws(() => publicToAddress('0x'), Error);
      assert.throws(() => publicToAddress({}), Error);
      assert.throws(() => publicToAddress(null), Error);
      assert.throws(() => publicToAddress(42323424342), Error);
      assert.throws(() => publicToAddress(''), Error);
    });
  });

  describe('generate', () => {
    it('should construct properly', () => {
      assert.equal(typeof generate, 'function');
    });

    it('should throw under invalid conditions', () => {
      assert.throws(() => generate({}), Error);
      assert.throws(() => generate(3443432243), Error);
      assert.throws(() => generate(undefined), Error);
      assert.throws(() => generate(null), Error);
      assert.throws(() => generate(''), Error);
    });

    it('should generate an address', () => {
      const testAccount = generate('fdsjklfsdjklsfdjkfsdkjlsfdkjsdfkljskljsdfkjfsdkjlsfkjsfdkjsfdkljsfdkljsdfkjlsdfkjsf');

      assert.equal(typeof testAccount, 'object');
      assert.equal(typeof testAccount.privateKey, 'string');
      assert.equal(typeof testAccount.publicKey, 'string');
      assert.equal(typeof testAccount.address, 'string');
      assert.equal(Object.keys(testAccount).length, 3);
      assert.equal(testAccount.privateKey.length, 66);
      assert.equal(testAccount.publicKey.length, 130);
      assert.equal(testAccount.address.length, 42);
    });

    it('should generate many random addresses', () => {
      for(var i = 0; i < 500; i++) { // eslint-disable-line
        const testAccount = generate('fdsjklfsdjklsfdjkfsdkjlsfdkjsdfkljskljsdfkjfsdkjlsfkjsfdkjsfdkljsfdkljsdfkjlsdfkjsf');

        assert.equal(typeof testAccount, 'object');
        assert.equal(typeof testAccount.privateKey, 'string');
        assert.equal(typeof testAccount.publicKey, 'string');
        assert.equal(typeof testAccount.address, 'string');
        assert.equal(Object.keys(testAccount).length, 3);
        assert.equal(testAccount.privateKey.length, 66);
        assert.equal(testAccount.publicKey.length, 130);
        assert.equal(testAccount.address.length, 42);
      }
    });
  });

  describe('getAddress', () => {
    it('should construct properly', () => {
      assert.equal(typeof getAddress, 'function');
    });
  });

  describe('getChecksumAddress', () => {
    it('should construct properly', () => {
      assert.equal(typeof getChecksumAddress, 'function');
    });
  });

  function randomBuffer(length) {
    const buffer = crypto.randomBytes(length);
    return buffer;
  }

  function randomHexString(length) {
    return `0x${randomBuffer(length).toString('hex')}`;
  }

  describe('test checkSum address, and getAddress', () => {
    it('ethers getAddress should equal official toChecksumAddress', () => {
      function testAddress(address) {
        const official = ethUtil.toChecksumAddress(address);
        const ethers = getAddress(address);
        assert.equal(ethers, official, 'wrong address');
      }

      testAddress('0x0000000000000000000000000000000000000000');
      testAddress('0xffffffffffffffffffffffffffffffffffffffff');
      for (var i = 0; i < 10000; i++) { // eslint-disable-line
        testAddress(randomHexString(20));
      }
    });

    it('should throw as invalid get checksum address (checksum error)', () => {
      assert.throw(() => {
        invalidGetAddress('0xaB41D5688Facc5EB21aD86098BA230D23Cde0E31');
      }, Error);
    });

    it('should throw as invalid checksum', () => {
      assert.throw(() => {
        getAddress('sdfjhs992');
      }, Error);
    });

    it('should throw as invalid checksum number', () => {
      assert.throws(() => {
        getAddress(234234234);
      }, Error);
    });

    it('should throw as invalid checksum number', () => {
      assert.throws(() => {
        getChecksumAddress(234234234);
      }, Error);
    });

    it('should throw as invalid checksum number', () => {
      assert.throws(() => {
        getChecksumAddress('sdfk^jsfdkjs9');
      }, Error);
    });

    it('should convert non hexed address', () => {
      assert.equal(getAddress('0000000000000000000000000000000000000000'), '0x0000000000000000000000000000000000000000');
    });

    it('test ICAP', () => {
      assert.equal(getAddress('00c5496aee77c1ba1f0854206a26dda82a81d6d8').toLowerCase(), '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8');
    });

    it('test not supported IBAN/ICAP', () => {
      assert.throws(() => getAddress('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'), Error);
    });
  });
});
