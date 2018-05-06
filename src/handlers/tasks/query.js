const query = {
	// Retrieve all Tasks for a given user
	retrieveAll: params =>
		`SELECT
			Task_ID id,
			Name,
			Description,
			Priority,
			Creation_Date,
			Estimated_Date,
			Status status
		FROM Task
		WHERE Account_ID = ${params.user_id};`,
	// Create a task for a given user
	create: payload =>
		`INSERT INTO Task (
			Account_ID,
			Name,
			Description,
			Priority,
			Creation_Date,
			Estimated_Date,
			Status
		) VALUES (
			'${payload.user_id}',
			'${payload.title}',
			'${payload.description}',
			'${payload.priority}',
			'${payload.startDate}',
			'${payload.endDate}',
			'${payload.status}'
		);`,
	// Toggle status of Task
	changeStatus: payload =>
		`UPDATE Task
		SET Status = ${payload.status}
		WHERE Task_ID = ${payload.task_id};`,
	// Remove task from a user
	remove: payload =>
		`DELETE FROM Task
		WHERE Task_ID = ${payload.task_id};`
};

module.exports = query;
