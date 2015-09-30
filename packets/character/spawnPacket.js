var crypto = require('crypto'),
	type = require('../type'),
	CharModel = require('../models/char'),
	opcodes = require('./opcodes');

module.exports = function(spawnID, charModel) 
{
	var packet = {
		type: type.Character,
		operation: opcodes.characterOperation.Spawn,
		spawnID: spawnID,
		gender: charModel.gender,
		gear: charModel.gear,
		movSpd: charModel.stats.movSpd,
		atkSpd: charModel.stats.atkSpd
	};

	return packet;
};