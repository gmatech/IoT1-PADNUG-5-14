var TempSensor = require('./fakeTempSensor');
var Reporter = require('./fileReporter');

var reporter = Object.create(Reporter);

setInterval(function() {
    var temp = TempSensor.readTemperature(function(temp) {
        reporter.report(temp);
    });
}, 1000);