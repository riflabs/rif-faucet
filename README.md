# RIF Faucet

At: [0xa98d30d3436f24886e0dd4bd440666dd1d140d5c](https://explorer.testnet.rsk.co/address/0xa98d30d3436f24886e0dd4bd440666dd1d140d5c).

## Usage

```sh
git clone https://github.com/riflabs/rif-faucet.git
cd rif-faucet
yarn install
truffle console --network rskTestnet
truffle(rskTestnet)> let faucet
truffle(rskTestnet)> TokenFaucet.deployed().then(f => (faucet = f))
truffle(rskTestnet)> faucet.dispense('0x...', { gasPrice: 0 })
```
