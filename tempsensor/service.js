var TempSensor = require('./fakeTempSensor');
var Reporter = require('./consoleReporter');

var reporter = new Reporter();

setInterval(function() {
    var temp = TempSensor.readTemperature(function(temp) {
        reporter.report(temp);
    });
}, 1000);