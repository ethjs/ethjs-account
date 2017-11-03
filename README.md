## ethjs-account

<div>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/ethjs/ethjs-account">
    <img src="https://david-dm.org/ethjs/ethjs-account.svg"
    alt="Dependency Status" />
  </a>

  <!-- devDependency Status -->
  <a href="https://david-dm.org/ethjs/ethjs-account#info=devDependencies">
    <img src="https://david-dm.org/ethjs/ethjs-account/dev-status.svg" alt="devDependency Status" />
  </a>

  <!-- Build Status -->
  <a href="https://travis-ci.org/ethjs/ethjs-account">
    <img src="https://travis-ci.org/ethjs/ethjs-account.svg"
    alt="Build Status" />
  </a>

  <!-- NPM Version -->
  <a href="https://www.npmjs.org/package/ethjs-account">
    <img src="http://img.shields.io/npm/v/ethjs-account.svg"
    alt="NPM version" />
  </a>

  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/ethjs/ethjs-account">
    <img src="https://coveralls.io/repos/github/ethjs/ethjs-account/badge.svg" alt="Test Coverage" />
  </a>

  <!-- Javascript Style -->
  <a href="http://airbnb.io/javascript/">
    <img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg" alt="js-airbnb-style" />
  </a>
</div>

<br />

A simple Ethereum account utility module.

Warning: if using with React Native, please use a pre-build distribution (i.e. npm run buld -> /dist/..). We will be switching to the Sepcc256k1 module which should resolve this issue.

## Install

```
npm install --save ethjs-account
```

## Usage

```js
const generate = require('ethjs-account').generate;

console.log(generate('892h@fsdf11ks8sk^2h8s8shfs.jk39hsoi@hohskd'));

/* result
{
  address: '0x...',
  privateKey: '0x...',
  publicKey: '0x....',
}
*/
```

Note, the address exported is the mix case checksum.

## About

This module is meant to aid in the management and generation of Ethereum account keys. It is still pending review. Entropy generation is handled by a combination of sha3 hashing, crypto random bytes and provided entropy salt. It is up the developer to ensure good entropy is generated for the accounts.

This module contains methods to convert private keys into Buffer public keys, and Buffer public keys into Ethereum addresses. The sha3 method is exposed as it is needed for key generation.

See the `user-guide` for more details on good entropy generation, and other module information.

## Method API

```
generate             <Function (String) : (Object)>
getAddress           <Function (String) : (String)>
getChecksumAddress   <Function (String) : (String)>
sha3                 <Function (String, Boolean) : (String)>
privateToPublic      <Function (String) : (Object)>
publicToAddress      <Function (Object) : (String)>
privateToAccount     <Function (String) : (Object)>
```

## Contributing

Please help better the ecosystem by submitting issues and pull requests to `ethjs-account`. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBNB linting standard and the unix philosophy.

## Guides

You'll find more detailed information on using `ethjs-account` and tailoring it to your needs in our guides:

- [User guide](docs/user-guide.md) - Usage, configuration, FAQ and complementary tools.
- [Developer guide](docs/developer-guide.md) - Contributing to `ethjs-account` and writing your own code and coverage.

## Help out

There is always a lot of work to do, and will have many rules to maintain. So please help out in any way that you can:

- Create, enhance, and debug ethjs rules (see our guide to ["Working on rules"](./github/CONTRIBUTING.md)).
- Improve documentation.
- Chime in on any open issue or pull request.
- Open new issues about your ideas for making `ethjs-account` better, and pull requests to show us how your idea works.
- Add new tests to *absolutely anything*.
- Create or contribute to ecosystem tools.
- Spread the word!

Please consult our [Code of Conduct](CODE_OF_CONDUCT.md) docs before helping out.

We communicate via [issues](https://github.com/ethjs/ethjs-account/issues) and [pull requests](https://github.com/ethjs/ethjs-account/pulls).

## Important documents

- [Changelog](CHANGELOG.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](https://raw.githubusercontent.com/ethjs/ethjs-account/master/LICENSE)

## Licence

This project is licensed under the MIT license, Copyright (c) 2016 Nick Dodson. For more information see LICENSE.md.

```
The MIT License

Copyright (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

## Original Port Checksum/getAddress Author

Richard Moore <me@ricmoo.com>
