// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ghntVesting.sol";

interface VestingContract{
 function withdraw(address _user) external;
}


contract ghntICO is ReentrancyGuard {
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

      function Buy() public payable nonReentrant() {
        require(vested[msg.sender]==address(0),"Wallet already bought");
        uint _amount=msg.value;
        require(_amount>0,"Cannot buy with 0 value of msg.value" );
        require(ERC20(ghntToken).balanceOf(address(this))>_amount*ratio,"Not enough ghnt tokens left in contract" );
        vestInternal(msg.sender,ghntToken,_amount*ratio);
        
    }

    function withdraw() public {
        VestingContract vesting=VestingContract(vested[msg.sender]);
        vesting.withdraw(msg.sender);

    }
  
   function withdrawBNBAdmin(uint _amount) public {
        require(msg.sender==admin,"Only admin can withdraw");
        payable(admin).transfer(_amount);
   }

  function vestInternal(address _user,address _token,uint _amount) internal {
    ghntVesting vesting=new ghntVesting(_user,vestingSchedule,vestingSchedule.length,_token,address(this),_amount);
    vested[_user]=address(vesting);
    ERC20(ghntToken).transfer(address(vesting),_amount);
    }

    }
  
    

