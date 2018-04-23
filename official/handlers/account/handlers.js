const database = require("../database");
const query = require("./query");

function login(request, reply) {
	if(!fullyDefined(request.payload, ["email","password"])) {
		return reply({'message': 'Parameter Error'}).code(400);
	} else {
		database.runQueryPromise(query.checkAccount(request.payload))
		.then( (results) => {
			if(results.length === 0) throw 'no-match'
			return reply({
				name: results[0].Name,
				id: results[0].ID,
			}).code(200);
		}).catch( (error) => {
			if (error == 'no-match') {
				return reply({ message: "Signin Invalid" }).code(400);
			} else {
				console.log(error);
				return reply({
					message: "PROBLEM OCCURED WHEN CHECKING PASSWORD"
				}).code(500);
			}
		});
	}
}

//Adding jobs -> Sync
//Adding supplies -> Async

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
		if(result.length != 0) {
			console.log("return");
			return reply().code(404);
		} else {
			let jobList = [];
			account = {};
			database.runQueryPromise(query.retrieve(request.params))
			.then( (jobInfo) => {
				if (jobInfo.length === 0) throw 'no-jobs';
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
				if(error === 'no-jobs') {
					return reply({message: "no-jobs"}).code(400)
				} else {
					return reply().code(500);
				}
			})
		}
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

	database.runQueryPromise(query.checkEmail(request.payload))
		.then( (results) => {
			if(results.length !== 0) throw 'already-exists';
			const insert = (request.payload.type === 1) ? 
				query.addSupplier(request.payload) : query.addUser(request.payload);
			database.runQueryPromise(insert);
		}).then( () => {
			return reply({ message: "Account created" }).code(201);
		}).catch( (error) => {
			if (error == 'already-exists') {
				return reply({ message: "Account already exists. Please log in" }).code(400);
			} else {
				console.log(error);
				return reply().code(500);
			}
		});
}

function changePassword(request, reply) {
	if(!fullyDefined(request.payload,
		["email", "password", "newpassword"])) {
		return reply("bad parameter error").code(400);
	}

	database.runQueryPromise(query.checkAccount(request.payload))
		.then( (results) => {
			if(results.length === 0) throw 'no-match';
			database.runQueryPromise(query.changePassword(request.payload));
		}).then( () => {
			return reply({
				message:"Password Successfully Changed"
			}).code(200);
		}).catch( (error) => {
			if (error === 'no-match') {
				return reply({ message: "Passwords do not match" }).code(400);
			} else {
				return reply().code(500);
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
