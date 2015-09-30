'use strict';

var CryptoJS = require("crypto-js"), 
	crypto = require('crypto'),
	config = require('./config'),
	util = require('./util');

module.exports.encrypt = function(data) {
	var message = data;

	if(Object.prototype.toString.call(data) == "[object Object]") {
		try {
			message = JSON.stringify(data);
			
		}
		catch(e) {
			console.log(e);
		}
	}

	if(config.encryption)
	{
		var encrypted = CryptoJS.AES.encrypt(message,
			CryptoJS.enc.Utf8.parse(config.key), { 
			mode: CryptoJS.mode.CBC, 
			padding: CryptoJS.pad.Pkcs7,
			iv: CryptoJS.enc.Utf8.parse(config.iv) 
		});
	
		message = encrypted.toString();
	}
	
	message = util.toHex32(message.length) + message;
	console.log("Sending:" + message);
	return message;
};

module.exports.decrypt = function(data) {
	var decrypted;
	var packet = {};
	
	if(config.encryption)
	{
		decrypted = CryptoJS.AES.decrypt(data.toString(), 
			CryptoJS.enc.Utf8.parse(config.key), { 
			mode: CryptoJS.mode.CBC, 
			padding: CryptoJS.pad.Pkcs7,
			iv: CryptoJS.enc.Utf8.parse(config.iv) 
		});
		
		try {
			var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
			packet = JSON.parse( decryptedText );
		}
		catch(e) {
			console.log("Could not parse decrypted packet: " + e);
		}
	}
	else
	{
		try{
			packet = JSON.parse(data.toString());
		} catch(e) {
			console.log("JSON parsing of data failed: " + e);
		}
	}
	
	return packet;
};