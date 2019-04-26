const assert = require('assert');
const ERC677TokenContract = artifacts.require('ERC677TokenContract');
const TokenFaucet = artifacts.require('TokenFaucet');

var chai = require('chai');
var BN = require('bn.js');
var bnChai = require('bn-chai');
chai.use(bnChai(BN));
const expect = chai.expect;

contract('TokenFaucet', async (accounts) => {
  var tokenFaucet, token;

  beforeEach(async () => {
    token = await ERC677TokenContract.new(accounts[0], web3.utils.toBN(1e20));
    tokenFaucet = await TokenFaucet.new(token.address);
  });

  it('should create contract', async () => { });

  it('should store token address', async () => {
    const actualTokenAddress = await tokenFaucet.tokenContract();

    assert.equal(actualTokenAddress, token.address);
  });

  it('should receive tokens', async () => {
    const tokenAmount = web3.utils.toBN(10e18);

    const previousBalance = await token.balanceOf(tokenFaucet.address);

    await token.transfer(tokenFaucet.address, tokenAmount);

    const balance = await token.balanceOf(tokenFaucet.address);

    expect(balance).to.eq.BN(previousBalance.add(tokenAmount))
  });

  it('should store owner', async () => {
    const owner = await tokenFaucet.owner();

    assert.equal(owner, accounts[0]);
  });

  it('should recover all received tokens', async () => {
    const tokenAmount = web3.utils.toBN(10e18);

    await token.transfer(tokenFaucet.address, tokenAmount);

    const previousBalance = await token.balanceOf(accounts[0]);

    await tokenFaucet.recover();

    const balance = await token.balanceOf(accounts[0]);

    expect(balance).to.eq.BN(previousBalance.add(tokenAmount));
  });

  it('should send one token to another account', async () => {
    const tokenAmount = web3.utils.toBN(10e18);
    const account = accounts[1];

    const previousBalance = await token.balanceOf(account);

    await token.transfer(tokenFaucet.address, tokenAmount);
    await tokenFaucet.dispense(account);

    const balance = await token.balanceOf(account);

    expect(balance).to.eq.BN(previousBalance.add(web3.utils.toBN(1e18)));
  });

  it('should change tokens dispensed', async () => {
    const tokenAmount = web3.utils.toBN(2e18);

    await tokenFaucet.setDispenseValue(tokenAmount);

    const dispenseValue = await tokenFaucet.dispenseValue();

    expect(dispenseValue).to.eq.BN(tokenAmount);
  });

  it('should send the dispensed value setted', async () => {
    const tokenAmount = web3.utils.toBN(2e18);
    const account = accounts[1];

    await tokenFaucet.setDispenseValue(tokenAmount);
    await token.transfer(tokenFaucet.address, web3.utils.toBN(10e18));

    const previousBalance = await token.balanceOf(account);

    await tokenFaucet.dispense(account);

    const balance = await token.balanceOf(account);

    expect(balance).to.eq.BN(previousBalance.add(tokenAmount));
  });

  it('should allow only owner to change the dispensed value', async () => {
    try {
      await tokenFaucet.setDispenseValue(web3.utils.toBN(10e18), { from: accounts[1] });
    } catch (e) {
      return;
    }
    assert.fail('Should throw an exception.');
  });

  it('should dispense only once a day', async () => {
    const tokenAmount = web3.utils.toBN(10e18);
    const account = accounts[0];

    await token.transfer(tokenFaucet.address, tokenAmount);
    await tokenFaucet.dispense(account);

    const previousBalance = await token.balanceOf(account);

    try {
      await tokenFaucet.dispense(account);
    } catch (e) {
      const balance = await token.balanceOf(account);
      expect(balance).to.eq.BN(previousBalance);
      return;
    }

    assert.fail();
  });

  it('should dispense again after one day', async () => {
    const dispensedAmount = web3.utils.toBN(1e18);
    const account = accounts[0];

    await token.transfer(tokenFaucet.address, web3.utils.toBN(10e18));

    const previousBalance = await token.balanceOf(account);

    await tokenFaucet.dispense(account);

    await web3.currentProvider.send({ id: 0, jsonrpc: '2.0', method: 'evm_increaseTime', params: [86401] }, () => { });

    await tokenFaucet.dispense(account);

    const balance = await token.balanceOf(account);

    expect(balance).to.eq.BN(previousBalance.add(dispensedAmount.mul(web3.utils.toBN(2))));
  })
});
