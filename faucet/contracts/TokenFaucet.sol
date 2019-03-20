pragma solidity >=0.4.21 <0.6.0;

import "./tokens/ERC677TokenContract.sol";

contract TokenFaucet {
    address public owner;
    ERC677TokenContract public tokenContract;

    uint public dispenseValue = 1 * 10**18;

    constructor (ERC677TokenContract _tokenContract) public {
        owner = msg.sender;
        tokenContract = _tokenContract;
    }

    function recover () public {
        uint totalAmount = tokenContract.balanceOf(address(this));
        tokenContract.transfer(owner, totalAmount);
    }

    function dispense (address to) public {
        tokenContract.transfer(to, dispenseValue);
    }

    function setDispenseValue (uint value) public {
        dispenseValue = value;
    }
}
