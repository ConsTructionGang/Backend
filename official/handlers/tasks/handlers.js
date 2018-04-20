const database = require('../database');
const query = require('./query');

function retrieve(request, reply) {
	database.runQuery(query.retrieveAll(request.params), function(error, results) {
		if(error) {
			console.log(error);
			reply({
				message: "PROBLEM RETRIEVING TASKS"
			}).code(500);
		} else {
			return reply({
				results
			}).code(200);
		}
	});
}

function create(request, reply) {
	request.payload.job_id = request.params.job_id;
	database.runQuery(query.create(request.payload), function(error) {
		if(error) {
			console.log(error);
			reply({
				message: "PROBLEM CREATING TASK"
			}).code(500);
		} else {
			return reply({
				message: "Task created"
			}).code(200);
		}
	});
}

function complete(request, reply) {
	database.runQuery(query.complete(request.payload), function(error) {
		if(error) {
			console.log(error);
			reply({
				message: "PROBLEM COMPLETING TASK"
			}).code(500);
		} else {
			return reply({
				message: "Marked as complete"
			}).code(200);
		}
	});
}

function remove(request, reply) {
	database.runQuery(query.remove(request.payload), function(error) {
		if(error) {
			console.log(error);
			reply({
				message: "PROBLEM REMOVING TASK"
			}).code(500);
		} else {
			reply({
				message: "Task deleted"
			}).code(200);
		}
	});
}

module.exports = {
	create,
	complete,
	remove,
	retrieve,
};