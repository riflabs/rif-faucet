const TokenFaucet = artifacts.require('TokenFaucet');

const rifAddress = '0xd8c5adcac8d465c5a2d0772b86788e014ddec516';

module.exports = deployer => {
  return deployer.deploy(TokenFaucet, rifAddress, { gasPrice: 0 });
};
