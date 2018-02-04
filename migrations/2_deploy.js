var TxUserWallet = artifacts.require("./TxUserWallet.sol");
var TxAttackWallet = artifacts.require("./TxAttackWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(TxUserWallet);
  deployer.deploy(TxAttackWallet);
};
