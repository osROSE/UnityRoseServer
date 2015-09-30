'use strict';

var Map = require('./map'),
	_ = require('lodash'),
	validator = require('validator'),
	mongoose = require('mongoose'),
	UserModel = require('../models/user'),
	MapModel = require('../models/map'),
	CharSpawnModel = require('../models/charSpawn'),
	CharModel = require('../models/char'),
	GateModel = require('../models/gate'),
	loginPacket = require('../packets/user/loginpacket'),
	registerPacket = require('../packets/user/registerpacket'),
	UserManager = require('./usermanager'),
	opcodes = require('../packets/opcodes'),
	crypto = require('../crypto');

var MapManager = function(mapName) {
	
	var model = null;
	var mapManager = this;
	
	MapModel.findOne({
		name: mapName
	}, function(err, map) {
		if( !err && map )
			mapManager.model = map;
		else
		{
			mapManager.model = MapModel.create({ name: mapName });
			console.log("Map \"" + mapName + "\" not found, so a new entry was created.");
		}
	});
			
	this.chars = [];
	
	this.packetHandlers = {};

	this.handlePacket = function(client, packet) {

		var packetHandler = this.packetHandlers[packet.operation];

		if(packetHandler !== undefined) {
			packetHandler(client, packet);
		}
	};

	// Character is spawned when:
	// - After char select
	// - After teleport
	// - After death + go to spawn
	// Spawn packet contains:
	// - charID
	// - requestedSpawnID
	// Map manager should:
	// - Lookup mapID and position of spawn
	// - Validate spawn - is it allowed?
	// - Add charID to map associated to mapID
	// - Report to all chars in map that char has spawned
	this.spawnChar = function(client, packet) {
		var mapManager = this;
		
		CharSpawnModel.findOne({
			_spawnID: packet.spawnID
		}, function(err, spawn) {
			var response;
			if(!err) {
				CharModel.findOne({
					_charID: packet.charID
				}), function(err, char){
					if(!err && packet.spawnID)
					mapManager.addChar(char);
					
				}
				
			}
		});
		
		UserModel.findOne({ 
			username: packet.username, 
			password: packet.password 
		}, function(err, user) {

			var response;

			if(err) {
				response = opcodes.loginCallbackOperation.Error;
			} else {
				if(user) {
					UserManager.addUser(client, user);
					response = opcodes.loginCallbackOperation.Valid;
				} else {
					response = opcodes.loginCallbackOperation.NotExist;
				}
			}

			var encryptedPacket = crypto.encrypt( loginPacket( response ) );
			client.write( encryptedPacket );
		});
	};

	this.addChar = function(char) {
		this.chars.push(char);
		this.model._chars.push(char);
		this.model.save(null);
	}
	
	this.removeChar = function(char) {
		_.remove(this.chars, function(_char) {
			return _char === char;
		});
		
		this.model._chars.pull(char);
		this.model.save(null);
	}

	this.findIndex = function(char) {
		var index = _.findIndex(this.chars, function(_char) {
			return (_char === char);
		});

		return index;
	}

	this.getChar = function(char) {
		var index = this.findIndex(char);
		if( index < 0 )
			return null;
		return this.chars[index];
	};
	
	this.registerPacket = function(key, func) {
		//if(process.env.NODE_ENV == "production") {
			//this.packetHandlers[key] = _.bind(func, this);
		//}

		//only for debugging
		//if(process.env.NODE_ENV == "development") {}
		var _this = this;
		this.packetHandlers[key] = function(client, packet) {

			var wrapper = _.bind(func, _this),
					operation;

			_.find(opcodes.mapOperation, function(value, name) {
				if(packet.operation === value) {
					operation = name;
					return true;
				}
			});

			console.log("[" + mapName + "] < [" + client.id + "] - '" + operation + "' packet recieved");

			wrapper(client, packet);

			console.log("[" + mapName + "] > [" + client.id + "] - '" + operation + "' packet handled");
		};
	};

	this.registerPacket(opcodes.mapOperation.Spawn, this.spawnChar);
	console.log("Map manager has loaded");
};

module.exports = MapManager;