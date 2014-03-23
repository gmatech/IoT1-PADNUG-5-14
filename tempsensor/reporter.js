var macModule = require('getmac');

function Reporter() {
}

Reporter.prototype = {
    report: function() {
        throw "Not Implemented";
    },

    getDeviceId: function(callback) {
        macModule.getMac(function(err, macAddress) {
            if (err) throw err;
            callback(macAddress);    
        });
    }
}

module.exports = Reporter;
