/* handlers.js
* Honeyscape
*"function handlers for job management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

// Important query handler for database
const database = require('../database');

// Import neccesary query files
const jobs = require('./query');
const account = require('../account/query');
const supplies = require('../supplies/query');
const supply_handlers = require('../supplies/handlers');

// Function handler for creating a user job
function create(request, reply) {
	database.runQueryPromise(account.isSupplier(request.params))
		.then( (results) => {
			if (results[0]) throw 'no-page';
			return database.runQueryPromise(jobs.add(request.payload, request.params));
		}).then(() => {
			return database.runQueryPromise(jobs.getLastID());
		}).then((results) => {
			if(request.payload.supplies && request.payload.supplies.length != 0) {
				request.params.job_id = results[0].Job_ID;
				throw 'add-supplies';
			}
		}).then( () => {
			return reply({
				title: "Job created"
			}).code(200);//Returns code 200 if job creation is successful
		}).catch( (error) => {
			if(error === 'no-page') {
				return reply().code(400);//Returns code 400 if unable to create job because of a bad request
			} else if (error === 'add-supplies') {
				supply_handlers.addToJob(request, reply);
			} else {
				console.log(error);
				return reply().code(400);//If server runs into an error return code 400
			}
		});
}

//Function handler for editing a user job
function editJob(request, reply) {
	request.payload.status = (request.payload.status === 'In Progress') ? false : true;
	database.runQueryPromise(jobs.edit(request.payload, request.params))
		.then(() => {
			if (request.payload.supplies && request.payload.supplies.length != 0) {
				let string = "";
				let data;
				try {
					data = JSON.parse(request.payload.supplies);
				} catch (error) {
					data = request.payload.supplies;
				}
				for (let i = 0; i < data.length; i++) {
					string += '(';
					string += request.params.job_id + ', ';
					string += data[i]['id'] + ', '; 
					string += (!(data[i]['SupplierID']) ? 'NULL' : data[i]['SupplierID'])  + ')';
					if(i != data.length-1) {
						string += ',';
					}
				}
				return database.runQueryPromise(supplies.addToList(string));
			}
		}).then(() => {
			return reply().code(200);
		}).catch((error) => {
			console.log(error);
			return reply().code(400);
		});
}

// Delete job related to job_id
function remove(request, reply) {
	database.runQueryPromise(jobs.remove(request.params))
		.then(() => {
			return reply().code(200);
		}).catch((error) => {
			console.log(error);
			return reply().code(400);
			// If server runs into an error return code 400
		});
};

// Retrieves all jobs for a constructor.
function retrieveAll(request, reply) {
	database.runQueryPromise(account.isSupplier(request.params))
		.then( (results) => {
			if (results.length != 0) throw 'no-page';
			return database.runQueryPromise(jobs.retrieveAll(request.params));
		}).then( (results) => {
			return reply(results).code(200);
		}).catch( (error) => {
			if (error === 'no-page') {
				return reply().code(400);
			} else {
				console.log(error);
				return reply().code(400);
			}
		});
}

module.exports = {
	create,
	remove,
	retrieveAll,
	editJob,
};
