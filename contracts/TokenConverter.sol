//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./BaseToken.sol";

contract TokenConverter is Ownable {

    address private _firstTokenAddress;
    address private _secondTokenAddress;

    uint256 private _firstTokenPrice;   

    constructor( address firstAddress, address secondAddress  ) {  
        _firstTokenAddress = firstAddress;
        _secondTokenAddress = secondAddress;

    }

    function setFirstTokenPrice (uint256 firstTokenPrice) public onlyOwner   {
        _firstTokenPrice = firstTokenPrice;
    } 

    function getFirstTokenPrice () public view returns(uint256)  {
        return _firstTokenPrice ;
    } 

    function convertFirstTokenToSecond( uint256  amount) public   {  

        console.log("TokenConvertor.convertFirstTokenToSecond(): msg.sender= ", msg.sender );      

        BaseToken token1 =  BaseToken(_firstTokenAddress);
        BaseToken token2 =  BaseToken(_secondTokenAddress);

        token1.transferFrom_my( msg.sender, address(this) , amount);
        token2.transfer_my(_firstTokenAddress, calculateAmount(amount));
         console.log("TokenConvertor.convertFirstTokenToSecond(): _firstTokenAddress= ", _firstTokenAddress );  
    } 

    function calculateAmount(  uint256 amount) internal view returns (uint256) {
        return _firstTokenPrice*amount;
    }









}