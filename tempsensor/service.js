var tempSensor = require('./fakeTempSensor');
var tempReporter = require('./tempReporter');

setInterval(function() {
    var temp = tempSensor.readTemperature(function(temp) {
        tempReporter.report(temp);
    });
}, 5000);