const TokenFaucet = artifacts.require('TokenFaucet');

const rifAddress = '0x19F64674D8A5B4E652319F5e239eFd3bc969A1fE';

module.exports = deployer => {
  return deployer.deploy(TokenFaucet, rifAddress, { gasPrice: 0 });
};
