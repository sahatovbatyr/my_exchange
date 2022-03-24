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

    function transfer_my( address to, uint256 amount )  public  returns (bool ) {

        console.log("BaseToken.tranfer_my(): contract_adr=%s  msg.sender=%s", address(this), msg.sender);
        console.log("BaseToken.tranfer_my(): to_adress= ", to);

        return transfer( to,  amount);

    }

    function transferFrom_my( address from, address to, uint256 amount)  public  returns (bool ) {

        console.log("BaseToken.tranferFrom_my(): contract_adr=%s  msg.sender=%s", address(this), msg.sender);

        return transferFrom(from,  to,  amount);

    }



}