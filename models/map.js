'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mapSchema = new Schema({
	_mapID: Number,
	_planet: Number,
	_respawns:Number,
	_chars: [String],
	_npcs: [Number],
	_mobSpawns: [Schema.Types.ObjectId],
	_gates: [Number],
	// TODO: remove the nonID versions when the other db's are filled
	name: String,
	planet: String,
	mobs: [{ name: String, pos: { x: Number, y: Number, z: Number}, _mobID: Schema.Types.ObjectId }],
	npcs: [{ name: String, pos: {x: Number, y: Number, z: Number}}]
});

var Map = mongoose.model('Map', mapSchema);

module.exports = Map;