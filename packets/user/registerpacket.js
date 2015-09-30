'use strict';

var crypto = require('crypto'),
	type = require('../type'),
	opcodes = require('./opcodes');

module.exports = function(response) 
{
	var packet = {
		type: type.User,
		operation: opcodes.userOperation.Register,
		response: response
	};

	return packet;
};