'use strict';

var _ = require('lodash');

module.exports = {
	User: 1,
	Character: 2,


	get: function(value) {
		var _this = this,
			_key = undefined;

		_.find(this, function(val, key) {
			if(val === value) {
				_key = key;
				return true;
			}
		});

		return _key;
	}
};