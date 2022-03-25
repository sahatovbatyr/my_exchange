//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./BaseToken.sol";

contract TokenConverter is Ownable {

    address private _firstTokenAddress;
    address private _secondTokenAddress;
    uint256 private _commission;


    uint256 private _firstTokenPrice;   

    constructor( address firstAddress, address secondAddress  ) {  
        _firstTokenAddress = firstAddress;
        _secondTokenAddress = secondAddress;
        _commission = 10;

    }

    function setFirstTokenPrice (uint256 firstTokenPrice) public onlyOwner   {
        _firstTokenPrice = firstTokenPrice;
    } 

    function getFirstTokenPrice () public view returns(uint256)  {
        return _firstTokenPrice ;
    } 

    function setCommission (uint256 commission) public onlyOwner   {
        _commission = commission;
    } 

    function getCommission () public view returns(uint256)  {
        return _commission ;
    } 

    function convertFirstTokenToSecond( uint256  amount) public   {              

        BaseToken token1 =  BaseToken(_firstTokenAddress);
        BaseToken token2 =  BaseToken(_secondTokenAddress);

        token1.transferFrom( msg.sender, address(this) , amount);
        token1.transferFrom( msg.sender, owner() , amount);
        token2.transfer(_firstTokenAddress, calculateAmount_foSecondToken(amount));           
    } 

    function convertSecondTokenToFirst( uint256  amount) public   {

        BaseToken token1 =  BaseToken(_firstTokenAddress);
        BaseToken token2 =  BaseToken(_secondTokenAddress);

        token2.transferFrom( msg.sender, address(this) , amount);
        token2.transferFrom( msg.sender, owner() , amount);
        token1.transfer(_secondTokenAddress, calculateAmount_foFirstToken(amount));
         
    }

    function calculateAmount_foSecondToken(  uint256 amount) internal view returns (uint256) {
        return _firstTokenPrice*amount;
    }

    function calculateAmount_foFirstToken(  uint256 amount) internal view returns (uint256) {
        return amount/_firstTokenPrice;
    }

     function calculateCommission(  uint256 amount) internal view returns (uint256) {
        return (_commission*amount)/100;
    }











}