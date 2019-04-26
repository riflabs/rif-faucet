const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = '...';

module.exports = {
  networks: {
    rskTestnet: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "https://public-node.testnet.rsk.co:443")
      },
      network_id: 31
    }
  },
  compilers: {
    solc: {
      version: "0.4.24",
    }
  }
};
