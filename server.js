'use strict';

var _ = require('lodash'),
	net = require('net'),
	JsonSocket = require('json-socket'),
	consoleStamp = require('console-stamp'),
	shortid = require('shortid'),
	config = require('./config'),
	common = require('./common'),
	type = require('./packets/type'),
	crypto = require('./crypto'),
	World = require('./world/world');


//set console format
consoleStamp(console, "dd mmm HH:mm:ss");

//load models and database
var mongoose = require('./models');

//Create server
var server = net.createServer();

//Create new world
var world = new World();

// Track all clients
var clients = [];  // TODO: separate clients from users

server.on('connection', function(socket) {

	socket.id = shortid.generate();

	console.log( "[" + socket.id + "][CONNECTED]");

	clients.push(socket);
	
	socket.on('data', function(data) {
		var packet = crypto.decrypt(data);
		console.log(socket.id + "packet: " + packet.toString());
		switch(packet.type) {
			case type.User:
				world.handleUserPacket(socket, packet);
				break;
			case type.Character:
				world.handleCharacterPacket(clients, packet);
				break;
			default:
				console.log("unknown packet");
				break;
		}
	});

	socket.on('disconnect', function() {
		console.log("disconnect");
		world.removeClient(socket);
	});

	socket.on('error', function(e) {
		console.log("Exception: " + JSON.stringify(e));
	});
});

server.listen(config.PORT, function() {
	console.log("Server listening on port " + server.address().port);
});