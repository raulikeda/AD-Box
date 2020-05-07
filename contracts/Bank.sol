pragma solidity >=0.5.0 <0.7.0;


contract Bank {
    uint256 public capital;
    address public owner;

    struct Client {
        address clientID;
        uint256 balance;
    }

    mapping(address => Client) public clients;

    constructor() public {
        owner = msg.sender;
        capital = 0;
    }

    function deposit() public payable {
        clients[msg.sender].clientID = msg.sender;
        clients[msg.sender].balance += msg.value;
        capital += msg.value;
    }

    function withdraw(uint256 amount) public returns (uint256) {
        if (clients[msg.sender].balance >= amount) {
            clients[msg.sender].balance -= amount;
            capital -= amount;
            msg.sender.transfer(amount);
            return amount;
        }
        return 0;
    }

    function transfer(address beneficiary, uint256 amount)
        public
        returns (bool)
    {
        if (clients[msg.sender].balance >= amount) {
            clients[msg.sender].balance -= amount;

            clients[beneficiary].clientID = beneficiary;
            clients[beneficiary].balance += amount;
            return true;
        }
        return false;
    }
}
