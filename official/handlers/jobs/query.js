const query = {
	remove: payload =>
		`DELETE FROM Job
		WHERE List_ID = '${payload.list_id}';`,
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
			CURDATE(),
			'${payload.completion_date}'
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
			`UPDATE Job(
				Job_Title,
				Address,
				City,
				State,
				Budget,
				Completion_Date
			) Values (
				'${payload.job_title}',
				'${payload.address}',
				'${payload.city}',
				'${payload.state}',
				'${payload.budget}',
				'${payload.completion_date}'
			)
			WHERE Job_ID = ${params.job_id};`
};

module.exports = query;
