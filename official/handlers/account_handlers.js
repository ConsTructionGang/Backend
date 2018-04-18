const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function changePassword(request, reply) {
	if(!helpers.fullyDefined(request.payload,
		["email", "password", "newpassword"])) {
		return reply("bad parameter error").code(400);
	}
	const checkEmailExists = helpers.fillParameters("Email");
	checkEmailExists(request.payload.email, function(result){
		if(result.length !== 0) {
			newPassword(request.payload, reply);
		} else {
			return reply("Account does not exist").code(200);
		}
	});
}

function newPassword(payload, reply) {
	database.runQuery(query.changePassword(payload), function(error){
		if (error) {
			console.log(error);
			return reply("***PROBLEM OCCURED WITH MYSQL***").code(400);
		} else {
			return reply("Password Successfully Changed").code(200);
		}
	});
}
// update account
// set Password = '${new password}'
// 
// selct natural join session and account

// Insert all collumns and insert null for those that are not relavent 
module.exports = changePassword;