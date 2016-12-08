# User Guide

All information for developers using `ethjs-account` should consult this document.

## Install

```
npm install --save ethjs-account
```

## Usage

```js
const generate = require('ethjs-account').generate;

console.log(generate('892h@fs8sk^2h8s8shfs.jk39hsoi@hohskd..'));

/* result
{
  address: '0x...',
  privateKey: '0x...',
  publicKey: '0x....',
}
*/
```

## API Design

### generate

[index.js:ethjs-account](../../../blob/master/src/index.js "Source code on GitHub")

Intakes a string of entropy, and outputs an address private key and public key.

**Parameters**

- `entropy` **String** a single string of entropy (`IMPORTANT NOTE`: be sure to make it long, complex and well sourced entropy)

Result output generated account **Object**.

```js
const generate = require('ethjs-account').generate;

console.log(generate('892h@fs8sk^2h8s8shfs.jk39hsoi@hohskd..'));

/* result
{
  address: '0x...',
  privateKey: '0x...',
  publicKey: '0x....',
}
*/
```

### getAddress

[index.js:ethjs-account](../../../blob/master/src/index.js "Source code on GitHub")

Intakes a public key buffer object, outputs an Ethereum 20 byte address

**Parameters**

- `publicKey` **Object** public key buffer object

Result output an Ethereum 20 byte address **String**.

```js
const getAddress = require('ethjs-account').getAddress;

console.log(getAddress(<Buffer instance>));

/* result '0x......' */
```

### getChecksumAddress

[getChecksumAddress.js:ethjs-account](../../../blob/master/src/index.js "Source code on GitHub")

Intakes an address, outputs a checksum address.

**Parameters**

- `address` **String** a single Ethereum address as a 20 byte hex string

Result output checksum address **String**.

```js
const getChecksumAddress = require('ethjs-account').getChecksumAddress;

console.log(getChecksumAddress('0x.....'));

/* result 0x..... */
```

### privateToPublic

[index.js:ethjs-account](../../../blob/master/src/index.js "Source code on GitHub")

Intakes a single private key, outputs a public key Buffer instance.

**Parameters**

- `privateKey` **String** a single 32 byte hex string (with hex prefix).

Result output public key Buffer instance **Object**.

```js
const privateToPublic = require('ethjs-account').privateToPublic;

console.log(privateToPublic(sha3('892h@fs8sk^2h8s8shfs.jk39hsoi@hohskd..')));

/* result <Buffer ...> */
```

### publicToAddress

[index.js:ethjs-account](../../../blob/master/src/index.js "Source code on GitHub")

Intakes a single public key instance, outputs an Ethereum standard 20 byte hex string address.

**Parameters**

- `publicKey` **Object** a public key buffer instance object

Result output Ethereum standard 20 byte checksum address **String**.

Note, the address exported is the checksum address, `.toLowerCase` when using with modules that do not support the casing mixture.

```js
const publicToAddress = require('ethjs-account').publicToAddress;

console.log(publicToAddress(<Buffer instance>));

// result '0x......'
```

### privateToAccount

[index.js:ethjs-account](../../../blob/master/src/index.js "Source code on GitHub")

Intakes a single private key, outputs an account object containing three hex strings, `publicKey`, `privateKey` and `address`.

**Parameters**

- `privateKey` **String** a single 32 byte private key string (hex prefixed).

Result output account **Object**.

```js
const privateToAccount = require('ethjs-account').privateToAccount;

console.log(privateToAccount(sha3('892h@fs8sk^2h8s8shfs.jk39hsoi@hohskd..')));

/* result
{
  address: '0x...',
  privateKey: '0x...',
  publicKey: '0x....',
}
*/
```

Note, the address exported is the checksum address, `.toLowerCase` when using with modules that do not support the casing mixture.

## A Note on Entropy and Account Safety

In order to generate an account that is safe for use, you must generate a lot of entropy. The larger, more complex, more hashed and more sourced the better. Please be sure to use very powerful entropy generation tools and sources.

See:
https://github.com/keybase/more-entropy
https://github.com/ConsenSys/eth-lightwallet
https://github.com/mdp/gibberish-aes/

## Entropy Used

This module uses [`randombytes`](https://github.com/crypto-browserify/randombytes) for some extra entropy. This module does not work in older browsers and will throw an error. In node, this module uses `crypto.randomBytes`, while in the browser it uses the `window` crypto module. Random bytes is purely for some basic entropy saftey and is in no way a solid replacement for good entropy. It is up to you to provide extensive entropy for your key generation.

## Browser Builds

`ethjs` provides production distributions for all of its modules that are ready for use in the browser right away. Simply include either `dist/ethjs-account.js` or `dist/ethjs-account.min.js` directly into an HTML file to start using this module. Note, an `ethSha3` object is made available globally.

```html
<script type="text/javascript" src="ethjs-account.min.js"></script>
<script type="text/javascript">
ethSha3(...);
</script>
```

Note, even though `ethjs` should have transformed and polyfilled most of the requirements to run this module across most modern browsers. You may want to look at an additional polyfill for extra support.

Use a polyfill service such as `Polyfill.io` to ensure complete cross-browser support:
https://polyfill.io/

## Latest Webpack Figures

```
Hash: ab378ace2dcbcdc84923                                                            
Version: webpack 2.1.0-beta.15
Time: 1041ms
               Asset    Size  Chunks             Chunk Names
    ethjs-account.js  313 kB       0  [emitted]  main
ethjs-account.js.map  385 kB       0  [emitted]  main
  [37] multi main 28 bytes {0} [built]
    + 37 hidden modules

Hash: f6b69ff438836239c7a6                                                            
Version: webpack 2.1.0-beta.15
Time: 4124ms
               Asset    Size  Chunks             Chunk Names
ethjs-account.min.js  164 kB       0  [emitted]  main
  [37] multi main 28 bytes {0} [built]
    + 37 hidden modules
```

## Other Awesome Modules, Tools and Frameworks

### Foundation
 - [web3.js](https://github.com/ethereum/web3.js) -- the original Ethereum JS swiss army knife **Ethereum Foundation**
 - [ethereumjs](https://github.com/ethereumjs) -- critical ethereum javascript infrastructure **Ethereum Foundation**
 - [browser-solidity](https://ethereum.github.io/browser-solidity) -- an in browser Solidity IDE **Ethereum Foundation**

### Nodes
  - [geth](https://github.com/ethereum/go-ethereum) Go-Ethereum
  - [parity](https://github.com/ethcore/parity) Rust-Ethereum build in Rust
  - [testrpc](https://github.com/ethereumjs/testrpc) Testing Node (ethereumjs-vm)

### Testing
 - [wafr](https://github.com/silentcicero/wafr) -- a super simple Solidity testing framework
 - [truffle](https://github.com/ConsenSys/truffle) -- a solidity/js dApp framework
 - [embark](https://github.com/iurimatias/embark-framework) -- a solidity/js dApp framework
 - [dapple](https://github.com/nexusdev/dapple) -- a solidity dApp framework
 - [chaitherium](https://github.com/SafeMarket/chaithereum) -- a JS web3 unit testing framework
 - [contest](https://github.com/DigixGlobal/contest) -- a JS testing framework for contracts

### Wallets
 - [ethers-wallet](https://github.com/ethers-io/ethers-wallet) -- an amazingly small Ethereum wallet
 - [metamask](https://metamask.io/) -- turns your browser into an Ethereum enabled browser =D

## Our Relationship with Ethereum & EthereumJS

 We would like to mention that we are not in any way affiliated with the Ethereum Foundation or `ethereumjs`. However, we love the work they do and work with them often to make Ethereum great! Our aim is to support the Ethereum ecosystem with a policy of diversity, modularity, simplicity, transparency, clarity, optimization and extensibility.

 Many of our modules use code from `web3.js` and the `ethereumjs-` repositories. We thank the authors where we can in the relevant repositories. We use their code carefully, and make sure all test coverage is ported over and where possible, expanded on.

## A Special Thanks

A special thanks to Richard Moore for building `ethers-wallet` and other amazing things. Aaron Davis (@kumavis) for his guidence.
