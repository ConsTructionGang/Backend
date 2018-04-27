/* handlers.js
* Honeyscape
*"function handlers for Task management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

const database = require('../database');
const tasks = require('./query');

function retrieve(request, reply) {
	database.runQueryPromise(tasks.retrieveAll(request.params))
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
	database.runQueryPromise(tasks.create(request.payload))
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

function edit(request, reply) {
	request.payload.task_id = request.params.task_id;
	database.runQueryPromise(tasks.edit(request.payload))
		.then( () => {
			return reply({
				message: "Task created"
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply({
				message: "PROBLEM CREATING TASK"
			}).code(400);
		});
}

function complete(request, reply) {
	database.runQueryPromise(tasks.complete(request.payload))
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
	database.runQueryPromise(tasks.remove(request.payload))
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
	edit,
};
