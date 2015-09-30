'use strict';

var crypto = require('crypto'),
	type = require('../type'),
	opcodes = require('./opcodes');

exports.SpawnCharPacket = function(model) 
{
	var packet = {
		type: type.User,
		operation: opcodes.userOperation.CharSelect,
		charModel: model
	};

	return packet;
};

exports.CreateCharPacket = function(status) 
{
	var packet = {
		type: type.User,
		operation: opcodes.userOperation.CreateChar,
		status: status
	};

	return packet;
};

exports.SelectCharPacket = function(status, map) 
{
	var packet = {
		type: type.User,
		operation: opcodes.userOperation.SelectChar,
		name: map,
		status: status
	};

	return packet;
};