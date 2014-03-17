require('module');
var mac = require('getmac');

exports.report = function(temp) {
    console.log('temperature: ' + temp);

    // Fetch the computer's mac address
    mac.getMac(function(err, macAddress) {
        if (err) throw err;
        console.log(macAddress);    
    });
}