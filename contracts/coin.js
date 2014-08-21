var contract = "0x986cb217801315f9babdc8ee7385f4f3eacd032c";

var send_coins = function () {
  var amount = document.getElementById("amount").value;
  var recipient = document.getElementById("recipient").value;
  // Check address is valid. TODO: much better check...
  if(recipient.length == 42) {
    var balance = eth.stateAt(contract, eth.secretToAddress(eth.key), "");
    if(parseInt(amount, 10) > parseInt(balance, 16)) {
      alert("Your balance isn't high enough to send " + amount + ".");
    } else {
      if(confirm("Really send " + amount + " to " + recipient + "?")) {
        var notice = "Sent" + amount + " to " + recipient + " at " + new Date().toLocaleTimeString();
        eth.transact(eth.key, "0", contract,
                     recipient.unbin().pad(32) + amount.toString(16).pad(32),
                     "10000", eth.gasPrice);
        document.getElementById("notice").innerHTML = notice;
      }
    }
  }
};

var balance_changed = function () {
  var balance = eth.stateAt(contract, eth.secretToAddress(eth.key), "");
  document.getElementById("balance").innerHTML = parseInt(balance, 16);
  document.getElementById("account").innerHTML = eth.secretToAddress(eth.key);
};

window.onload = function () {
  eth.watch(contract, balance_changed);
  balance_changed();
};
