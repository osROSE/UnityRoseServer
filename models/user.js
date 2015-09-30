'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	server: {type: Number, default: 0 },
	online: { type: Boolean, default: false },
	_chars: {type: Array, default: [] },
	activeChar: {type: String, default: "" },
	activeMap: {type: String, default: "" }
});

var User = mongoose.model('User', userSchema);

module.exports = User;