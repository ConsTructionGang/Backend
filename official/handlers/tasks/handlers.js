const database = require('../database');
const query = require('./query');

function retrieve(request, reply) {
	database.runQuery(query.retrieveAll(request.params))
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
	request.payload.job_id = request.params.job_id;
	database.runQuery(query.create(request.payload))
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
	database.runQuery(query.complete(request.payload))
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
	database.runQuery(query.remove(request.payload))
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
