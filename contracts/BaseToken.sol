//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseToken is ERC20, Ownable  {

    

    constructor( string memory name, string memory symbol ) ERC20(name, symbol) {
       
    }

    function mint (address receiver, uint256 weiAmount ) public onlyOwner returns( bool) {

        _mint(receiver, weiAmount );
        return true;

    }

    



}