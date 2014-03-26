var Reporter = require('./reporter');

function FileReporter() {
}

FileReporter.prototype =  new Reporter();
FileReporter.prototype.report = function(temp) {
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
        console.log(JSON.stringify(status));
    });
};

module.exports = FileReporter;