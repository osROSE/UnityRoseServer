'use strict';

var config = require('../config'),
	mongoose = require('mongoose'),
	_ = require('lodash'),
	path = require('path'),
	fs = require('fs');

mongoose.connect(config.db);

mongoose.connection.on('connected', function() {
	console.log("Database connection open to " + config.db);

	var user = new mongoose.models.User({ name: "Wahid" });
	user.save();
});

mongoose.connection.on('error', function(err) {
	console.log("Database connection error " + err);
	process.exit(0);
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log("Database connection disconnected through app termination");
		process.exit(0);
	});
});


/*var loadedModels = 0;

fs.readdirSync(__dirname)
.filter(function(file) {
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	require(path.join(__dirname, file));
	loadedModels++;
});

console.log(loadedModels + " model(s) loaded");*/

module.exports = mongoose;
