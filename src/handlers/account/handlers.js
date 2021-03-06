/* handlers.js
* Honeyscape
*"function handlers for account management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

//Important query handler for database
const database = require("../database");

//Import neccesary query files
const account = require("./query");
const tasks = require('../tasks/query');
const jobs = require('../jobs/query');
const supplies = require('../supplies/query');
const suppliers = require('../suppliers/handlers')

/**
*Account Login Handler
*@param request Contains email and password for loging into account inside of payload
*@param reply Empty reply object that is utilized to return account info and reply code
*@return parameter reply
*/
function login(request, reply) {
	if(!fullyDefined(request.payload, ["email","password"])) {// if payload received in incorrect format
		return reply({'message': 'Parameter Error'}).code(400);//Throw error
	} else {
		database.runQueryPromise(account.checkPassword(request.payload))
		.then( (results) => {
			if(results.length === 0) throw 'no-match'
			return reply({//if success return reply with ID and name
				"id": results[0].ID,
				"name": results[0].Name,
				"type": (results[0].isSupplier) ? 'Supplier' : 'User',
			}).code(200);
		}).catch( (error) => {
			if (error == 'no-match') {//If no account found
				return reply({ message: "Bad Request" }).code(400);//throw error
			} else {
				console.log(error);
				return reply({
					message: "PROBLEM OCCURED WHEN CHECKING PASSWORD"//Any other error, throw error
				}).code(500);
			}
		});
	}
}

/**
*Job object: Utilized in account information retrieval
*@param data contains data from database to form job object
*@returns supplies from job
*/
function job(data) {
  	async function getSupplies() {
		return database.runQueryPromise(supplies.retrieve(jobObj.id))
			.then(results => {
				jobObj.supplies = results;
				return jobObj;
			}).catch(error => {
				console.log(error);
				return reject(error);
		});
	}

	const jobObj = {
		id: data.ID,
		title: data.Title,
		address: data.Address,
		city: data.City,
		state: data.State,
		cost: data.Budget,
		start_date: data.Start_Date,
		end_date: data.Completion_Date,
		status: (data.Completed) ? "Complete" : "In Progress"
	};

	return {
    	supplies: () => getSupplies()
  	};
}

/**
*Retrieves account information
*@param request Contains user ID in payload
*@param reply Empty reply object that is utilized to return account info and reply code
*@return reply object containing the information for a user 
*/
function retrieve(request, reply) {
	const accountJSON = {};

	database.runQueryPromise(account.isSupplier(request.params))
		.then( (isSupplier) => {
			if(isSupplier.length !== 0) throw 'no-page';

			return database.runQueryPromise(account.retrieveInfo(request.params));
		}).then( (userInfo) => {
			if (userInfo.length === 0) return [];

			accountJSON.id = userInfo[0]["ID"];
			accountJSON.email = userInfo[0]["Email"];
			accountJSON.type = userInfo[0]["Type"];
			accountJSON.name = userInfo[0]["Name"];

			return database.runQueryPromise(jobs.retrieveAll(request.params));
		}).then( (jobList) => {
			for (let i = 0; i < jobList.length; i++) {
				jobList[i] = new job(jobList[i]);
				jobList[i] = Promise.resolve(jobList[i].supplies());
			}

			return Promise.all(jobList).then(function(newlist) {
				return newlist;
			});
		}).then( (jobsWithSupplies) => {
			accountJSON.jobs = jobsWithSupplies;
			request.params.user_id = request.params.id
			return database.runQueryPromise(tasks.retrieveAll(request.params));
		}).then( (tasks) => {
			accountJSON.tasks = tasks;
			return reply(accountJSON).code(200)
		}).catch( (error) => {
			if (error === 'no-page') {
				suppliers.view(request, reply);
			} else {
				console.log(error);
				return reply().code(500);
			}
		});
}

function register(request, reply) {
	request.payload.type = (request.payload.type === "User") ? 0 : 1;
	if(!fullyDefined(request.payload,
		["name", "password", "email", "type"])) {
		return reply({
			message: "bad parameter error"
		}).code(400);
	}

	database.runQueryPromise(account.checkEmail(request.payload))
		.then( (results) => {
			if(results.length !== 0) throw 'already-exists';

			const insert = (request.payload.type === 1) ?
				account.addSupplier(request.payload) : account.addUser(request.payload);

			database.runQueryPromise(insert);
		}).then( () => {
			if(request.payload.type == 'User'){
				return reply({
					email: request.payload.email,
					name:request.payload.name,
					password:request.payload.password,
					type:request.payload.type,
				}).code(201);
			}
			else{
				return reply({
					companyname:request.payload.companyname,
					email: request.payload.email,
					location:request.payload.location,
					name:request.payload.name,
					password:request.payload.password,
					type:request.payload.type,
				}).code(201);
			}
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

	database.runQueryPromise(account.changePassword(request.payload))
		.then((results)=>{
			return reply({message: "password changed"}).code(200);
		})
}

function edit(request, reply) {
	database.runQueryPromise(account.edit(request.payload))
	.then( () => {
		return reply().code(200);
	}).catch( (error) => {
		console.log(error);
		return reply().code(500);
	})
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
	retrieve,
	edit,
};
