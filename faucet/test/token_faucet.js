const assert = require('assert');
const ERC677TokenContract = artifacts.require('ERC677TokenContract');
const TokenFaucet = artifacts.require('TokenFaucet');

//tRIF contract: https://explorer.testnet.rsk.co/address/0xd8c5adcac8d465c5a2d0772b86788e014ddec516

contract('TokenFaucet', async (accounts) => {
  var tokenFaucet, token;

  beforeEach(async () => {
    token = await ERC677TokenContract.new(accounts[0], 1e24);
    tokenFaucet = await TokenFaucet.new(token.address);
  });

  it('should create contract', async () => { });

  it('should store token address', async () => {
    const actualTokenAddress = await tokenFaucet.tokenContract();

    assert.equal(actualTokenAddress, token.address);
  });

  it('should receive tokens', async () => {
    const tokenAmount = 10e18;

    const previousBalance = await token.balanceOf(tokenFaucet.address);

    await token.transfer(tokenFaucet.address, tokenAmount);

    const balance = await token.balanceOf(tokenFaucet.address);

    assert.equal(balance, previousBalance.toNumber() + tokenAmount);
  });

  it('should store owner', async () => {
    const owner = await tokenFaucet.owner();

    assert.equal(owner, accounts[0]);
  });

  it('should recover all received tokens', async () => {
    const tokenAmount = 10e18;

    await token.transfer(tokenFaucet.address, tokenAmount);

    const previousBalance = await token.balanceOf(accounts[0]);

    await tokenFaucet.recover();

    const balance = await token.balanceOf(accounts[0]);

    assert.equal(balance, previousBalance.toNumber() + tokenAmount);
  });

  it('should send one token to another account', async () => {
    const tokenAmount = 10e18;
    const account = accounts[1];

    const previousBalance = await token.balanceOf(account);

    await token.transfer(tokenFaucet.address, tokenAmount);
    await tokenFaucet.dispense(account);

    const balance = await token.balanceOf(account);

    assert.equal(balance, previousBalance.toNumber() + 1e18);
  });

  it('should change tokens dispensed', async () => {
    const tokenAmount = 2e18;

    await tokenFaucet.setDispenseValue(tokenAmount);

    const dispenseValue = await tokenFaucet.dispenseValue();

    assert.equal(dispenseValue, tokenAmount);
  });

  it('should send the dispensed value setted', async () => {
    const tokenAmount = 2e18;
    const account = accounts[1];

    await tokenFaucet.setDispenseValue(tokenAmount);
    await token.transfer(tokenFaucet.address, 10e18);

    const previousBalance = await token.balanceOf(account);

    await tokenFaucet.dispense(account);

    const balance = await token.balanceOf(account);

    assert.equal(balance, previousBalance.toNumber() + tokenAmount);
  });

  it('should allow only owner to change the dispensed value', async () => {
    try {
      await tokenFaucet.setDispenseValue(10e18, { from: accounts[1] });
    } catch (e) {
      return;
    }
    assert.fail('Should throw an exception.');
  });
});
