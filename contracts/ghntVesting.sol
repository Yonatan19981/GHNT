
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ghntVesting {
    address public user;  //user who can withdraw
    uint public amount;    //total amount allocated to user
    mapping(uint => uint) public vesting; //vesting percentage per month
    uint constant month=2592000;   //seconds in a month;
    address token;   //address of token vested
    uint monthsPast;   // how many months in total since the begining
    uint lastTime;     //last withdraw time
    address ICO;        //ICO contract]
    uint vestingLength; // total months of vesting
    constructor(address _user,uint [] memory _vesting,uint _vestingLength,address _token,address _ico,uint _amount) {
        require(_user!=address(0),"Cannot insert zero address");
        require(_token!=address(0),"Cannot insert zero address");
        require(_ico!=address(0),"Cannot insert zero address");

        ICO=_ico;
        lastTime=block.timestamp;
        user=_user;
        amount=_amount;
        token=_token;
          for(uint z=0;z<_vestingLength;z++){
        vesting[z]=_vesting[z];
        }
        vestingLength=_vestingLength;
        monthsPast=0;
    }
      function withdraw(address _user) public  {
        require(_user!=address(0),"Cannot insert zero address");
        require(msg.sender==ICO,"Only ICO contract can initiate withdraw");
        require(_user==user,"Only user can withdraw");
        require(monthsPast<vestingLength,"withdraw complete");
        require(block.timestamp-lastTime>month,"A month has not passed since last withdraw/withdraw complete");
        uint _time=block.timestamp-monthsPast;
        uint _amount=0;
        uint latest=monthsPast+_time/month;
        if(latest>vestingLength){
            latest=vestingLength;
        }
        for(uint z=monthsPast;z<latest;z++){
        _amount=_amount+amount*vesting[z]/1000;
        }
        require(ERC20(token).balanceOf(address(this))>=_amount,"Not enough amount to withdraw");
        monthsPast=latest;
        ERC20(token).transfer(user,_amount);
        lastTime=block.timestamp;



   
      }
}

