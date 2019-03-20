pragma solidity >=0.4.21 <0.6.0;

import "./tokens/ERC677TokenContract.sol";

contract TokenFaucet {
    ERC677TokenContract public tokenContract;

    constructor (ERC677TokenContract _tokenContract) public {
        tokenContract = _tokenContract;
    }
}
