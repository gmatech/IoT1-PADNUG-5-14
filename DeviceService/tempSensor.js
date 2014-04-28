var temper1 = require('temper1');

var devices = temper1.getDevices();

//console.log("Devices found:" + devices);

exports.readTemperature = function(err, callback) {
    temper1.readTemperature(devices[0], function(err, value) {
        //console.log("Result: " + value);
        callback(value);
    });
}