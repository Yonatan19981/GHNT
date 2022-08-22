// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ghntVesting.sol";
import "hardhat/console.sol";


contract vestingFactory is ReentrancyGuard {

    event Vested(address user, address vestingContract);
    mapping(address => address) public vested;
    address public admin;
    constructor(address _admin) {
    require(_admin!=address(0),"Cannot insert zero address");
    admin=_admin;
    }

    function vest(address _user,address _ghntToken,uint _amount,uint [] memory _vesting,uint _vestingLength ) public payable nonReentrant() returns (address vesting){
    require(msg.sender==admin,"Only admin can create vesting");
    require(_user!=address(0),"Cannot insert zero address");
    require(_ghntToken!=address(0),"Cannot insert zero address");
    ghntVesting _vesting=new ghntVesting(_user,_vesting,_vestingLength,_ghntToken,_user,_amount);
    ERC20(_ghntToken).transferFrom(msg.sender,address(_vesting),_amount);
    vested[_user]=address(_vesting);
    emit Vested(_user,address(_vesting));
    }


    function changeAdmin(address _admin) public {
        require(msg.sender==admin,"Only admin can change admins");
        require(_admin!=address(0),"Cannot insert zero address");

            admin=_admin;

    }
 

    }
  
    

//Author: www.yonatan.expert
