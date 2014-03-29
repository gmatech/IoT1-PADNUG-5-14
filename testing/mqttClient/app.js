var mqtt = require('mqtt');

setTimeout(function() {
    console.log('timeout');
    client.end();
}, 60000);

client = mqtt.createClient(4883, 'localhost');

client.subscribe('test');
client.publish('test', 'hello mqtt again', {retain: true, qos: 1});

client.on('message', function(topic, message) {
    console.log('received: ' + message);
});