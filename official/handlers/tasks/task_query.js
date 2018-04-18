const query = {
	retrieveAll: payload =>
		`SELECT * 
			FROM Task
			WHERE Job_ID = ${payload.job_id};`,
	create: payload =>
		`INSERT INTO Task(
			Name,
			Description,
			Priority,
			Creation_Date
			Estimated_Date
		) Values (
			'${payload.name}',
			'${payload.description}',
			${payload.priority},
			${payload.date_created},
			${payload.est_date}
		);`,
	complete: payload =>
		`UPDATE Task
			SET Completion_Date = ${payload.completion_date}
			WHERE ID = ${payload.id};`,
	remove: payload =>
		`DELETE FROM Task
			WHERE ID = ${payload.id};`
};

module.exports = query;