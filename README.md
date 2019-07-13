# RIF Faucet

Deployed in RSK Testnet: [0x248b320687eBF655f9ee7f62f0388c79fBB7b2f4](https://explorer.testnet.rsk.co/address/0x248b320687eBF655f9ee7f62f0388c79fBB7b2f4).

Faucet Web Client: [https://faucet.rifos.org](https://faucet.rifos.org).

## Usage

```sh
git clone https://github.com/riflabs/rif-faucet.git
cd rif-faucet
yarn install
# add mnemonic to provider in truffle-config.js
truffle console --network rskTestnet
truffle(rskTestnet)> let faucet
truffle(rskTestnet)> TokenFaucet.deployed().then(f => (faucet = f))
truffle(rskTestnet)> faucet.dispense('0x...', { gasPrice: 0 })
```
