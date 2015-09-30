'use strict';

var CharacterManager = require('./charactermanager');

var Map = function() {
	this.characterManager = new CharacterManager();
};

module.exports = Map;