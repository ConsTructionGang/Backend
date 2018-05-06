/* handlers.js
* Honeyscape
*"function handlers for Task management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

//Important query handler for database
const database = require('../database');

//Import neccesary query files
const tasks = require('./query');

/**
 * 	Retrieves all tasks related to a particular user id.
 */
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

/**
 *	Generates a new task id and assigns it to the tasklist.
 */
function create(request, reply) {
	request.payload.user_id = request.params.user_id;
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

/**
 *	Given a task id, marks  a task as complete.
 */
function complete(request, reply) {
	request.params.status = request.payload.status;
	database.runQueryPromise(tasks.changeStatus(request.params))
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

/**
 *	Given a task id, removes a task from the table.
 */
function remove(request, reply) {
	database.runQueryPromise(tasks.remove(request.params))
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
