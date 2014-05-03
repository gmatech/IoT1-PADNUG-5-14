//var TempSensor = require('./tempSensor');
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

var client = mqtt.createClient(mqttPort, mqttHost);
client.subscribe('configure');

client.on('message', function(topic, message) {
    console.log('got message: ' + message);
    var configuration = JSON.parse(message);
    console.log('got interval: ' + configuration.interval);
});

setInterval(function() {
    TempSensor.readTemperature(function(err, temp) {
        //console.log("temp: " + temp);
        reporter.report(temp);
    });
}, interval);