pragma solidity >=0.4.21 <0.6.0;

import "./tokens/ERC677TokenContract.sol";

contract TokenFaucet {
    address public owner;
    ERC677TokenContract public tokenContract;

    constructor (ERC677TokenContract _tokenContract) public {
        owner = msg.sender;
        tokenContract = _tokenContract;
    }
}
