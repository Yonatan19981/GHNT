
/*
 .----------------.  .----------------.  .-----------------. .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. |
| |    ______    | || |  ____  ____  | || | ____  _____  | || |  _________   | |
| |  .' ___  |   | || | |_   ||   _| | || ||_   \|_   _| | || | |  _   _  |  | |
| | / .'   \_|   | || |   | |__| |   | || |  |   \ | |   | || | |_/ | | \_|  | |
| | | |    ____  | || |   |  __  |   | || |  | |\ \| |   | || |     | |      | |
| | \ `.___]  _| | || |  _| |  | |_  | || | _| |_\   |_  | || |    _| |_     | |
| |  `._____.'   | || | |____||____| | || ||_____|\____| | || |   |_____|    | |
| |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------' 
*/

// SPDX-License-Identifier: MIT
//Author: www.yonatan.expert

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract GHNT is ERC20 {
    constructor(address _main) ERC20("GeoHunt", "GHNT") {
        require(_main!=address(0),"Cannot insert zero address");
       _mint(_main, 6000000000000000000000000000);
    }
      function burn(uint256 amount) public returns (bool) {
        _burn(_msgSender(), amount);
        return true;
    }
}

//Author: www.yonatan.expert
//link to audit: