var contract = "0x776315fb9f7ec6b95b706b1bd0f5e53d4e6e0b26";

var change_location = function () {
  var location = document.getElementById("location").value;
  eth.transact(eth.key, "0", contract,
               location.unbin().pad(32),
               "10000", eth.gasPrice);
  document.getElementById("display").innerHTML = "";
};

var location_changed = function () {
  var location = eth.stateAt(contract, 1001, "").bin();
  document.getElementById("display").innerHTML = location;
};

window.onload = function () {
  eth.watch(contract, location_changed);
  location_changed();
  if(eth.stateAt(contract, 1000,"")
   != eth.secretToAddress(eth.key)) {
    document.getElementById("change_location").style.display = 'none';
  } else {
    window.setTimeout(function() {
      document.getElementById("change_location").style.display = 'none';
    }, 30000);
  }
};
