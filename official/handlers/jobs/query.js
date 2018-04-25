const query = {
	remove: payload =>
		`DELETE FROM Job
		WHERE Job_ID = '${payload.job_id}';`,
	add: (payload, params) =>
		`INSERT INTO Job(
			Construction_ID,
			Job_Title,
			Address,
			City,
			State,
			Budget,
			Start_Date,
			Completion_Date
		) Values (
			'${params.id}',
			'${payload.title}',
			'${payload.address}',
			'${payload.city}',
			'${payload.state}',
			'${payload.cost}',
			'${payload.startDate}',
			'${payload.endDate}'
		);`,
	retrieveAll: params =>
		`SELECT
			Job_ID ID,
			Job_Title Title,
			Address,
			City,
			State,
			Budget,
			Start_Date,
			Completion_Date,
			Completed
		FROM Job
		WHERE Construction_ID = ${params.id}`,
	isSupplier: params =>
		`SELECT isSupplier
		FROM Account
		WHERE ID = ${params.id};`,
	edit: (payload, params) =>
			`UPDATE Job
			SET
				Job_Title = '${payload.title}',
				Address = '${payload.address}',
				City = '${payload.city}',
				State = '${payload.state}',
				Budget = ${payload.cost},
				Start_Date = '${payload.startDate}',
				Completion_Date = '${payload.endDate}'
			WHERE Job_ID = ${params.job_id};`
};

module.exports = query;
