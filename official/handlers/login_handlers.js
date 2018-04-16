const database = require("./database");
const query = require("./query");
const helpers = require("./handler_helpers");

function loginUser(request, reply) {
	if(!helpers.fullyDefined(request.payload, ["email","password"])) {
		return reply({'message': 'Parameter Error'}).code(400); 
	} else {
		checkPassword(request.payload, function(results){
			if(results.length === 0){
				return reply({'message': 'Sign Invalid'}).code(400);
			} else {
				return reply({
					message: 'Signed in',
					name: results[0].Name,
					id: results[0].ID,
				}).code(200);
			}
		});
	}
}

function checkPassword(payload, callback) {
	database.getConnection(function(err, connection) {
		connection.query(query.checkAccount(payload), function(
			error, 
			results
		) {
			connection.release();
			if (error) throw error;
			return callback(results);
		});
		if (err) throw err;
	});
}
module.exports = loginUser;
