// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ghntICO is ReentrancyGuard {

    address fourFee=0x278b3822Fb69B3465Da008F1755de124990bC018;
    address ghntToken;
    uint ratio;
    uint amount;
    address admin;
    constructor(address _admin,address _ghntToken,uint _ratio,uint _amount) {
      require(_admin!=address(0),"Cannot insert zero address");
      require(_ghntToken!=address(0),"Cannot insert zero address");

      ghntToken=_ghntToken;
      ratio=_ratio;
      amount=_amount;
      admin=_admin;

    }

      function Buy() public payable nonReentrant() {
        uint _amount=msg.value;
        uint _partial=amount*4/1000;
        require(ERC20(ghntToken).balanceOf(address(this))>_amount*ratio,"Not enough ghnt tokens left in contract" );
        payable(fourFee).transfer(_partial);
        ERC20(ghntToken).transferFrom(address(this),msg.sender,_amount*ratio);
        
    }

    function withdraw(address _token,uint _amount) public {
        require(msg.sender==admin,"Only admin can withdraw");
        require(_token!=address(0),"Cannot insert zero address");
        ERC20(_token).transferFrom(address(this),admin,_amount);

    }
  
   function withdrawBNB(uint _amount) public {
        require(msg.sender==admin,"Only admin can withdraw");
        payable(admin).transfer(_amount);

    }
}
