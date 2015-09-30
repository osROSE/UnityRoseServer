'use strict';

var _ = require('lodash'),
	dict = require('dict'),
	UserManager = require('./usermanager'),
	crypto = require('../crypto'),
	MapManager = require('./mapmanager');

var World = function() {

	this.userManager = new UserManager(this);
	
	this.mapDict = {};
	
	this.mapDict["zantCity"] = new MapManager("zantCity");
	this.mapDict["junonPolis"] = new MapManager("junonPolis");
	this.mapDict["fairyIsland"] = new MapManager("fairyIsland");
	
	this.getMapManager = function(mapName) {
		return this.mapDict[mapName];
	};
	
	
	this.handleUserPacket = function(client, packet) {
		this.userManager.handlePacket(client, packet);
	};

	this.handleCharacterPacket = function(clients, packet) {
		
		//probably move mapmanager to world
		var clientMoveData = crypto.encrypt(packet);
			
		_.each(clients, function(client) {
			client.write(clientMoveData);
		});
		
	};

	this.writeMoveData = function(client, moveData) {
		client.write(moveData);
	}
	this.removeClient = function(client) {
		//remove from usermanager and world
	} 

	console.log("World has started");
};

module.exports = World;