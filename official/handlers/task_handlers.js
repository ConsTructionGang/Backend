const helpers = './handler_helpers';

const query = {
	retrieveAll: payload => 
		`SELECT * 
		FROM Task
		WHERE Job_ID = ${payload.job_id}`,
	create: payload => 
		`INSERT INTO Task(
				`,
	complete: payload =>
		`UPDATE Task
		SET Completion_Date = ${payload.completion_date}
		WHERE ID = ${payload.id}`,
	remove: payload =>
		`DELETE FROM Task
		WHERE ID = ${payload.id}`
};

function retrieve(request, reply) {
	helpers.runQuery(query.retrieveAll(request.payload), function(results) {
		return reply({
			results
		})
	})
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