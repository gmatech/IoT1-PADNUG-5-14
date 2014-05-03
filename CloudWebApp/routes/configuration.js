var configure = require('./configure');

exports.edit = function(req, res) {
  res.render('edit-configuration');
};

exports.save = function(req, res) {
    configure.init();
    var mqttHost = configure.get('mqttHost');
    var mqttPort = configure.get('mqttPort');
    var client = mqtt.createClient(mqttPort, mqttHost);

    this.client.on('connect', function() {
        console.log('connected');
        var configuration = JSON.stringify({
            interval: 3000
        });
        client.publish('configure', configuration);
    });
};