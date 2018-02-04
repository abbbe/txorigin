pragma solidity ^0.4.11;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract TxUserWallet {
    address owner;

    function TxUserWallet() public payable {
        owner = msg.sender;
    }

    function transferTo(address dest, uint amount) public {
        require(tx.origin == owner);
        //dest.transfer(amount);
        dest.call.value(amount)();
    }
}