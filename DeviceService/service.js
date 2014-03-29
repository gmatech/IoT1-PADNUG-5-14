var TempSensor = require('./fakeTempSensor');
var Reporter = require('./mqttCloudReporter');
var configure = require('./configure');

configure.init();

var interval = configure.get('interval');
var filePath = configure.get('filePath');

var reporter = new Reporter(filePath);

setInterval(function() {
    var temp = TempSensor.readTemperature(function(temp) {
        reporter.report(temp);
    });
}, interval);