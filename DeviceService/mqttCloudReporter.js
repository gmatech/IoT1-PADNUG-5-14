var mqtt = require('mqtt');
var Reporter = require('./reporter');

function MqttCloudReporter(host, port) {
    this.client = mqtt.createClient(port, host);

    this.client.on('connect', function() {
        console.log('connected');
    });
}

MqttCloudReporter.prototype =  new Reporter();
MqttCloudReporter.prototype.report = function(temp) {
    var status;
    var self = this;
    this.getDeviceId(function(id) {
        status = {
            type: "temp",
            ip: self.getIpAddress(),
            deviceId: id,
            timestamp: Date.now(),
            data: {temperature: temp}
        };
        var currentStatus = JSON.stringify(status);
        console.log(currentStatus);        
        self.client.publish('temperature', currentStatus);
    });
}; 
MqttCloudReporter.prototype.dispose = function() {
    this.client.end();
}

module.exports = MqttCloudReporter;