const Migrations = artifacts.require("Migrations");
const Bank = artifacts.require("Bank");

module.exports = deployer => {
  deployer.deploy(Migrations);
  deployer.deploy(Bank);
};
