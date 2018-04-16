const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function createUser(request, reply) {
	
	initialize(request.payload);

	if(!helpers.fullyDefined(request.payload,
		["name", "password", "email", "type"])) {
		return reply("bad parameter error").code(400);
	}
 
	const checkEmailExists = helpers.fillParameters("Email");

	checkEmailExists(request.payload.email, function(result){
		if(result.length !== 0) {
			return reply("Account already exists. Please log in").code(400);
		} else {
			insertUser(request.payload, reply);
		}
	});
}

function insertUser(payload, reply) {
	const insert = (payload.type === 1) ? query.addSupplier(payload) : query.addUser(payload);
	database.getConnection(function(err, connection) {
		connection.query(insert, function(error){
			connection.release();
			if (error) {
				console.log("code 400: PROBLEM OCCURED");
				console.log(error);
				return reply("PROBLEM OCCURED").code(400);
			}
			return reply().code(201);
		});
		if (err) throw err;
	});
}

function initialize(payload) {
	if (payload.type === 'User') {
		payload.city = null;
		payload.state = null;
		payload.address = null;
		payload.type = 0;
	} else {
		payload.type = 1;
	}
}

module.exports = createUser;
