'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var charSchema = new Schema({
	_user: String,
	_spawn: { type: Number, default: 0 },
	_party: Schema.Types.ObjectId,
	_guild: Schema.Types.ObjectId,
	name: String,
	map: { type: String, default: "zantCity" },  // TODO: change default to fairy island
	online: {type: Number, default: 0},
	job1: { type: Number, default: 1 },
	job2:  { type: Number, default: 0 },
	level: { type: Number, default: 1 },
	pos: { x: Number, y: Number, z: Number},
	gender: String,
	weapon: String,
	rig: String,
	state: String,
	stats: {
		atk: { type: Number, default: 10 },
		def: { type: Number, default: 10 },
		dex: { type: Number, default: 10 },
		intel: { type: Number, default: 10 },
		crit: { type: Number, default: 10 },
		luck: { type: Number, default: 10 },
		movSpd: { type: Number, default: 10 },
		atkSpd: { type: Number, default: 10 }
	},
	equip: {
		faceID: { type: Number, default: 1 },
		hairID: { type: Number, default: 0 },
		chestID: { type: Number, default: 0  },
		footID: { type: Number, default: 0 },
		handID: { type: Number, default: 0 },
		weaponID: { type: Number, default: 1 },
		shieldID: { type: Number, default: 0 },
		backID: { type: Number, default: 0 },
		maskID: { type: Number, default: 0 },
		capID: { type: Number, default: 0 }
	}
		
});

var Char = mongoose.model('Char', charSchema);

module.exports = Char;