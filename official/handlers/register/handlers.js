const database = require('../database');
const query = require('./query');
const helpers  = require('../handler_helpers');

function createUser(request, reply) {
	
	request.payload.type = (request.payload.type === "User") ? 0 : 1;

	if(!helpers.fullyDefined(request.payload,
		["name", "password", "email", "type"])) {
		return reply("bad parameter error").code(400);
	}

	database.runQuery(query.checkEmail(request.payload), function(error, result){
		if(error) {
			console.log(error);
			return reply("PROBLEM OCCURRED WITH QUERY").code(500);
		} else if(result.length !== 0) {
			return reply("Account already exists. Please log in").code(400);
		} else {
			insertUser(request.payload, reply);
		}
	});
}

function insertUser(payload, reply) {
	const insert = (payload.type === 1) ? query.addSupplier(payload) : query.addUser(payload);

	database.runQuery(insert, function(error){
		if (error) {
			console.log("code 400: PROBLEM OCCURED");
			console.log(error);
			return reply("PROBLEM OCCURED").code(400);
		}
		return reply().code(201);
	});
}

module.exports = createUser;
