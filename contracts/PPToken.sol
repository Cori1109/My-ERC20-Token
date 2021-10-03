//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract PPToken is ERC20, Ownable {
    
    string private name_ = "PPToken";
    string private symbol_ = "PPT";
    uint8 public constant decimals_ = 0;
    
    // uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));
    
    constructor(uint256 INITIAL_SUPPLY) ERC20(name_, symbol_) Ownable() {
        decimals();
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    function decimals() public pure override returns (uint8) {
        return decimals_;    
    }
    
    function mintPPT(address account, uint256 amount) public payable onlyOwner{
        if(owner() == account) {
            _mint(owner(), amount);
        } else {
            require(amount <= totalSupply(), "can't overflow more than totalSupply");
            _transfer(owner(), account, amount);    
        }
    }
    
    function sendPPT(address account_to, uint256 amount) public payable {
        require(balanceOf(msg.sender) >= amount, "insufficient fund");
        _transfer(msg.sender, account_to, amount);
    }
}   