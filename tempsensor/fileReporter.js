var Reporter = require('./Reporter');

function FileReporter() {
}

FileReporter.prototype =  new Reporter();
FileReporter.prototype.report = function(temp) {
    console.log('temperature: ' + temp);

    Reporter.getDeviceId(function(id) {
        console.log('device id: ' + id);
    });
};

module.exports = FileReporter;