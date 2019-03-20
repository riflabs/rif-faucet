const assert = require('assert');
const TokenFaucet = artifacts.require('TokenFaucet');

//tRIF contract: https://explorer.testnet.rsk.co/address/0xd8c5adcac8d465c5a2d0772b86788e014ddec516

contract('TokenFaucet', async (accounts) => {
  var tokenFaucet;

  beforeEach(async () => {
    tokenFaucet = await TokenFaucet.new();
  });

  it('should create contract', async () => { });
});
