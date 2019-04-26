pragma solidity >=0.4.21 <0.6.0;

import "./tokens/ERC677TokenContract.sol";

contract TokenFaucet {
    address public owner;
    ERC677TokenContract public tokenContract;

    mapping (address => uint) cannotDispenseUntil;

    uint public dispenseValue = 1 * 10**18;

    modifier onlyOwner () {
        require(msg.sender == owner);
        _;
    }

    modifier canDispense (address to) {
        require(cannotDispenseUntil[to] < now);
        _;
    }

    constructor (ERC677TokenContract _tokenContract) public {
        owner = msg.sender;
        tokenContract = _tokenContract;
    }

    function recover () public {
        uint totalAmount = tokenContract.balanceOf(address(this));
        tokenContract.transfer(owner, totalAmount);
    }

    function dispense (address to) public canDispense(to) {
        tokenContract.transfer(to, dispenseValue);
        cannotDispenseUntil[to] = now + 1 days;
    }

    function setDispenseValue (uint value) public onlyOwner() {
        dispenseValue = value;
    }
}
