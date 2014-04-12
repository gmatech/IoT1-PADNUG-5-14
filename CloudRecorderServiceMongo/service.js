﻿var mqtt = require('mqtt');
var mongoose = require('mongoose');
var configure = require('./configure');

configure.init();
var mqttHost = configure.get('mqttHost');
var mqttPort = configure.get('mqttPort');

client = mqtt.createClient(mqttPort, mqttHost);

client.subscribe('temperature');

var tempSchema = mongoose.Schema({
    temperature: Number
});
var recordSchema = mongoose.Schema({
    type: String,
    ip: String,
    deviceId: String,
    timestamp: Date,
    data: [tempSchema]
});
var Record = mongoose.model('Record', recordSchema);

client.on('message', function(topic, message) {
    console.log('message: ' + message);
    console.log("connecting...");
    mongoose.connect('mongodb://localhost:27017/sensors');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected");
        var recordData = JSON.parse(message);
        console.log('saving data: ' + recordData);
        var record = new Record(recordData);
        console.log('saving record: ' + record);
        record.save(function(err) {
            if (!err) {
                console.log('record saved!');
            } else {
                console.log('save error: ' + err);    
            }
            console.log("disconnecting ...");
            mongoose.disconnect();
        });
    });
});