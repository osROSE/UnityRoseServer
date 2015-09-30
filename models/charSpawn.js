'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var charSpawnSchema = new Schema({
	_spawnID: Number,
	_map: Number,
	_planet: Number,
	// TODO: remove the nonID versions when the other db's are filled
	pos: {x: Number, y: Number, z: Number}
});

var CharSpawn = mongoose.model('CharSpawn', charSpawnSchema);

module.exports = CharSpawn;