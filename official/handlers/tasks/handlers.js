const database = require('../database');
const query = require('./query');

function retrieve(request, reply) {
	database.runQueryPromise(query.retrieveAll(request.params))
		.then( (results) => {
			return reply({
				results
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply({
				message: "PROBLEM RETRIEVING TASKS"
			}).code(500);
		});
}

function create(request, reply) {
	request.payload.account_id = request.params.account_id;
	database.runQueryPromise(query.create(request.payload))
		.then( () => {
			return reply({
				message: "Task created"
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply({
				message: "PROBLEM CREATING TASK"
			}).code(500);
		});
}

function complete(request, reply) {
	database.runQueryPromise(query.complete(request.payload))
		.then( () => {
			return reply({
				message: "Marked as complete"
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply({
				message: "PROBLEM COMPLETING TASK"
			}).code(500);
		});
}

function remove(request, reply) {
	database.runQueryPromise(query.remove(request.payload))
		.then( () => {
			return reply({
				message: "Task deleted"
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply({
				message: "PROBLEM REMOVING TASK"
			}).code(500);
		});
}

module.exports = {
	create,
	complete,
	remove,
	retrieve,
};
