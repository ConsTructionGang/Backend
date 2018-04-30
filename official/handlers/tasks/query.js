const query = {
	retrieveAll: params =>
		`SELECT
			Task_ID id,
			Name,
			Description,
			Priority,
			Creation_Date,
			Estimated_Date,
			Status
		FROM Task
		WHERE Account_ID = ${params.user_id};`,
	create: payload =>
		`INSERT INTO Task (
			Account_ID,
			Name,
			Description,
			Priority,
			Creation_Date,
			Estimated_Date
		) VALUES (
			'${payload.user_id}',
			'${payload.title}',
			'${payload.description}',
			'${payload.priority}',
			'${payload.startDate}',
			'${payload.endDate}'
		);`,
	complete: payload =>
		`UPDATE Task
			SET Status = 1
			WHERE Task_ID = ${payload.id};`,
	remove: payload =>
		`DELETE FROM Task
			WHERE Task_ID = ${payload.id};`
};

module.exports = query;
