'use strict';

var _ = require('lodash');

module.exports = _.extend(
	require('./character/opcodes'),
	require('./user/opcodes'),
	require('./map/opcodes')
);