var mqtt = require('mqtt');

client = mqtt.createClient(4883, 'localhost');

client.subscribe('temperature');

client.on('message', function(topic, message) {
    console.log('received: ' + topic + ' = ' + message);
});