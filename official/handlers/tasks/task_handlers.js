const helpers = './handler_helpers';
const query = './task_query';

function retrieve(request, reply) {
	helpers.runQuery(query.retrieveAll(request.payload), function(results) {
		return reply({
			results
		});
	});
}

function create(request, reply) {
	helpers.runQuery(query.create(request.payload), function() {
		return reply({
			message: "Task created"
		}).code(200);
	});
}

function complete(request, reply) {
	helpers.runQuery(query.complete(request.payload), function() {
		return reply({
			message: "Marked as complete"
		}).code(200);
	});
}

function remove(request, reply) {
	helpers.runQuery(query.remove(request.payload), function() {
		reply({
			message: "Deleted task"
		}).code(200);
	});
}

module.exports = {
	create,
	complete,
	remove,
	retrieve
};