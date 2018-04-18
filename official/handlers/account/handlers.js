const database = require("../database");
const query = require("./query");
const session = require("./session_handler");

function login(request, reply) {
	if(!fullyDefined(request.payload, ["email","password"])) {
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

function create(request, reply) {
	
	request.payload.type = (request.payload.type === "User") ? 0 : 1;

	if(!fullyDefined(request.payload,
		["name", "password", "email", "type"])) {
		return reply({
			message: "bad parameter error"
		}).code(400);
	}

	database.runQuery(query.checkEmail(request.payload), function(error, result){
		if(error) {
			console.log(error);
			return reply({
				message: "PROBLEM OCCURRED WITH QUERY"
			}).code(500);
		} else if(result.length !== 0) {
			return reply({
				message: "Account already exists. Please log in"
			}).code(400);
		} else {
			insert(request.payload, reply);
		}
	});
}

function insert(payload, reply) {
	const insert = (payload.type === 1) ? query.addSupplier(payload) : query.addUser(payload);

	database.runQuery(insert, function(error){
		if (error) {
			console.log(error);
			return reply({
				message: "PROBLEM OCCURED WHEN INSERTING NEW USER"
			}).code(500);
		}
		return reply().code(201);
	});
}

function changePassword(request, reply) {
	if(!fullyDefined(request.payload,
		["email", "password", "newpassword"])) {
		return reply("bad parameter error").code(400);
	}
	database.runQuery(query.checkEmail(request.payload.email), function(error, result){
		if()
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

function fullyDefined(payload, parameter) {
	for(let i = 0; i < parameter.length; i++) {
		if(payload[parameter[i]] === undefined) {
			console.log(parameter[i] + " is undefined");
			return false;
		}
	}
	return true;
}

module.exports = {
	login,
	create,
};