const query = {
	delete: payload =>
		`DELETE FROM Job
		WHERE List_ID = '${payload.list_id}';`,
	add: payload =>
		`INSERT INTO Job(
			Construction_ID,
			Job_Title,
			Address,
			City,
			State,
			Budget,
			Start_Date
		) Values (
			'${payload.construction_id}',
			'${payload.job_title}',
			'${payload.address}',
			'${payload.city}',
			'${payload.state}',
			'${payload.budget}',
			'${payload.start_date}'
		);`
};

module.exports = query;