﻿var os = require('os');

function getIpAddress() {
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (k in interfaces) {
        for (k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family == 'IPv4' && !address.internal) {
                addresses.push(address.address)
            }
        }
    }
    return addresses[0];
}

module.exports.getIpAddress = getIpAddress;