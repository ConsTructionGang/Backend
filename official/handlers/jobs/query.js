const query = {
	delete: payload =>
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
			'${payload.job_title}',
			'${payload.address}',
			'${payload.city}',
			'${payload.state}',
			'${payload.budget}',
			CURDATE(),
			'${payload.completion_date}'
		);`,
	retrieveAll: params =>
		`SELECT 
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
		WHERE ID = ${params.id};`
};

module.exports = query;