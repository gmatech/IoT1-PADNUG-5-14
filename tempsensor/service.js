var tempSensor = require('./fakeTempSensor');
var tempReporter = require('./tempReporter');
var reporterModule = require('./reporter');

var reporter = new reporterModule.Reporter();
reporter.report();

setInterval(function() {
    var temp = tempSensor.readTemperature(function(temp) {
        tempReporter.report(temp);
    });
}, 5000);