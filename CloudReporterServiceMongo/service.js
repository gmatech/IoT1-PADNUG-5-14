var mqtt = require('mqtt');
var configure = require('./configure');

configure.init();
var mqttHost = configure.get('mqttHost');
var mqttPort = configure.get('mqttPort');

client = mqtt.createClient(mqttPort, mqttHost);

client.subscribe('temperature');

var dbClient = require('mongodb').MongoClient;

client.on('message', function(topic, message) {
    console.log("Connecting");
    dbClient.connect("mongodb://localhost:27017/sensors", function(error, db) {
        if (error) {
            console.log('Connect error: ' + error);
            return;
        }
        console.log("Done connecting");
        console.log('Inserting ...');
        var temperatureReading = JSON.parse(message);
        db.collection('temperature').insert(temperatureReading, function(error, result) {
            if (error) {
                console.log('Insert error: ' + error);
            } else {
                console.log('Done inserting ...');
            }
            console.log('Closing ...');
            db.close();
        });
    });
});