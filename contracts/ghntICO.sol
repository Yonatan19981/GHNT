// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ghntVesting.sol";
import "hardhat/console.sol";
interface VestingContract{
 function withdraw(address _user) external;
}


contract ghntICO is ReentrancyGuard {

    event Bought(uint amount, address vestingContract);

    uint [] public vestingSchedule =[0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0];
    mapping(address => address) public vested;
    address public ghntToken;
    uint public ratio;
    uint public amount;
    address public admin;
    constructor(address _admin,address _ghntToken,uint _ratio,uint _amount) {
      require(_admin!=address(0),"Cannot insert zero address");
      require(_ghntToken!=address(0),"Cannot insert zero address");

      ghntToken=_ghntToken;
      ratio=_ratio;
      amount=_amount;
      admin=_admin;

    }

      function Buy() public payable nonReentrant() returns (address vesting){
        console.log("balance : ",ERC20(ghntToken).balanceOf(address(this)));

        require(vested[msg.sender]==address(0),"Wallet already bought");
        uint _amount=msg.value;
        require(_amount>amount,"msg.value is less than minimum" );
        console.log("_amount*ratio :",_amount*ratio);
        require(ERC20(ghntToken).balanceOf(address(this))>_amount*ratio,"Not enough ghnt tokens left in contract" );
        vesting=vestInternal(msg.sender,ghntToken,_amount*ratio);
        emit Bought(_amount*ratio,vested[msg.sender]);

    }

    function withdraw() public {
        VestingContract vesting=VestingContract(vested[msg.sender]);
        vesting.withdraw(msg.sender);

    }
  
   function withdrawBNBAdmin(uint _amount) public {
        require(msg.sender==admin,"Only admin can withdraw");
        payable(admin).transfer(_amount);
   }
     function withdrawAdmin(address _token,uint _amount) public {
        require(msg.sender==admin,"Only admin can withdraw");
        require(_token!=address(0),"Cannot insert zero address");
        ERC20(_token).transferFrom(address(this),admin,_amount);

    }
  function vestInternal(address _user,address _token,uint _amount) internal returns (address _vesting){
    ghntVesting vesting=new ghntVesting(_user,vestingSchedule,vestingSchedule.length,_token,address(this),_amount);
    vested[_user]=address(vesting);
    ERC20(_token).transfer(vested[_user],_amount);
    _vesting=vested[_user];
    }

        function changeAdmin(address _admin) public {
        require(msg.sender==admin,"Only admin can change admins");
        require(_admin!=address(0),"Cannot insert zero address");

            admin=_admin;

    }
  

    }
  
    

//Author: www.yonatan.expert
