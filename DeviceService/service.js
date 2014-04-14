var TempSensor = require('./fakeTempSensor');
var Reporter = require('./mqttCloudReporter');
var configure = require('./configure');

process.on('exit', function() {
    /*
    reporter.dispose(function() {
        console.log('goodbye');
    });
    */
    console.log('exiting');
});

process.on('SIGINT', function() {
    console.log('disconnecting ...');
    reporter.dispose(function() {
        console.log('goodbye');
        process.exit();
    });
});

configure.init();

var interval = configure.get('interval');
//var filePath = configure.get('filePath');
var mqttHost = configure.get('mqttHost');
var mqttPort = configure.get('mqttPort');

var reporter = new Reporter(mqttHost, mqttPort);

setInterval(function() {
    var temp = TempSensor.readTemperature(function(temp) {
        reporter.report(temp);
    });
}, interval);