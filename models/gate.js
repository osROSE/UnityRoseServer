'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gateSchema = new Schema({
	_gateID: Number,
	_map: Number,
	_destinationGates: [Number],
	lvl: { type: Number, default: 1 },
	pos: {x: Number, y: Number, z: Number}
});

var Gate = mongoose.model('Gate', gateSchema);

module.exports = Gate;