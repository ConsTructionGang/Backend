const database = require("../database");
const query = require("./query");
const session = require("./session_handler");

function loginUser(request, reply) {
	if(!helpers.fullyDefined(request.payload, ["email","password"])) {
		return reply({'message': 'Parameter Error'}).code(400);
	} else {
		database.runQuery(query.checkAcoount(request.payload), function(error, results){
			if(error) {
				console.log(error);
				return reply({
					message: "PROBLEM OCCURED WHEN CHECKING PASSWORD"
				}).code(500);
			} else if(results.length === 0){
				return reply({
					message: 'Sign Invalid'
				}).code(400);
			} else {
				return reply({
					name: results[0].Name,
					id: results[0].ID,
				}).code(200);
			}
		});
	}
}

module.exports = loginUser;
