const database = require("../database");
const query = require("./query");

function login(request, reply) {
	if(!fullyDefined(request.payload, ["email","password"])) {
		return reply({'message': 'Parameter Error'}).code(400);
	} else {
		database.runQuery(query.checkAccount(request.payload), function(error, results){
			if(error) {
				console.log(error);
				return reply({
					message: "PROBLEM OCCURED WHEN CHECKING PASSWORD"
				}).code(500);
			} else if(results.length === 0){
				return reply({
					message: 'Signin Invalid'
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

function job(_data) {
	const data = _data;
	async function createJob() {
		return database.runQueryPromise(
			query.retrieveJobs(data)
		).then( (results) => {
			return {
				id: data.Job_ID,
				title: data.Job_Title,
				address: data.Address,
				city: data.City,
				state: data.State,
				cost: data.Budget,
				start_date: data.Start_Date,
				end_date: data.Completion_Date,
				status: (null) ? 'In Progress' : 'Complete',
				supplies: results
			}
		}).catch( (error) => {
			console.log(error)
			return reject(error);
		})
	}

	return {
		create: () => createJob()
	}
}

function retrieve(request, reply) {
	database.runQuery(query.isSupplier(request.params), function(error, result){
		if(error) throw error;
		if(!(result.length === 0)) {
			console.log("return");
			return reply().code(404);
		}
	})
	let jobList = [];
	account = {};
	database.runQueryPromise(query.retrieve(request.params))
	.then( (jobInfo) => {
		account.id = jobInfo[0]["ID"];
		account.email = jobInfo[0]["Email"];
		account.type = jobInfo[0]["Type"];
		account.name = jobInfo[0]["Name"]
		for (let i = 0; i < jobInfo.length; i++) {
			jobList.push(new job(jobInfo[i]));
		}
		for (let i = 0; i < jobList.length; i++) {
			jobList[i] = Promise.resolve(jobList[i].create());
		}
		return Promise.all(jobList).then(function(newlist) {
			return newlist
		})
	}).then( (jobs) => {
		//run query to add supplies
		account.jobs = jobs
		return reply(account).code(200);
	}).catch( (error) => {
		console.log(error);
		return reply().code(500);
	})
}

function register(request, reply) {
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
		return reply({
			message: "Account created"
		}).code(201);
	});
}

function changePassword(request, reply) {
	if(!fullyDefined(request.payload,
		["email", "password", "newpassword"])) {
		return reply("bad parameter error").code(400);
	}
	database.runQuery(query.checkAccount(request.payload), function(error, result){
		if(result.length !== 0) {
			newPassword(request.payload, reply);
		} else {
			return reply("Passwords do not match").code(400);
		}
	});
}

function newPassword(payload, reply) {
	if(!session.checkSession(request.payload)) {
		return reply("Session Authentication Error").code(401);
	}
	database.runQuery(query.changePassword(payload), function(error){
		if (error) {
			console.log(error);
			return reply("***PROBLEM OCCURED WITH MYSQL***").code(400);
		} else {
			return reply("Password Successfully Changed").code(200);
		}
	});
}

function remove(request, reply) {
	if(!session.checkSession(request.payload)) {
		return reply("Session Authentication Error").code(401);
	}
	database.runQuery(query.checkAccount(request.payload), function(error, results){
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
			session.deleteSession(request.payload);
			return reply({
				name: results[0].Name,
				id: results[0].ID,
			}).code(200);
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
	register,
	changePassword,
	remove,
	retrieve
};
