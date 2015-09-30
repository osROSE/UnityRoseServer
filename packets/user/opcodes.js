'use strict';

module.exports = {
	userOperation: {
		Register: 0,
		Login: 1,
		CharSelect: 2,
		SelectChar: 3,
		CreateChar: 4,
		DeleteChar: 5
	},

	//LOGIN
	loginCallbackOperation: {
		Error: 0,
		NotExist: 1,
		Valid: 2
	},

	//REGISTER
	registerCallbackOperation: {
		Error: 0,
		Valid: 1,
		UsernameTooShort: 2,
		UsernameBadChars: 3,
		UsernameExists: 4,
		PasswordTooShort: 5,
		EmailUsed: 6,
		EmailInvalid: 7
	},
	
	// CHARSELECT
	charSelectCallBackOp: {
		Error: 0,
		Success: 1,
		NameExists: 2,
		InvalidChoice: 3
		
	}
};