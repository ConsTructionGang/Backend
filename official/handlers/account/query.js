const query = {
	checkEmail: payload =>
		`SELECT Email
		FROM Account
		WHERE Email = '${payload.email}';`,
	checkAccount: payload =>
		`SELECT Name, ID
		FROM (
			SELECT *
			FROM Account
			WHERE Email = '${payload.email}'
		) AS t
		WHERE Password = '${payload.password}';`,
	addSupplier: payload =>
		`INSERT INTO Account(
			Name,
			Email,
			Password,
			City,
			State,
			Address,
			isSupplier
		) VALUES (
			'${payload.name}',
			'${payload.email}',
			'${payload.password}',
			'${payload.city}',
			'${payload.state}',
			'${payload.address}',
			${payload.type}
		);`,
	addUser: payload =>
		`INSERT INTO Account(
			Name,
			Email,
			Password,
			isSupplier
		) VALUES (
			'${payload.name}',
			'${payload.email}',
			'${payload.password}',
			${payload.type}
		);`,
	changePassword: payload =>
		`UPDATE Account
		SET Password = '${payload.newpassword}'
		WHERE Email = '${payload.email}';`,
	deleteAccount: payload =>
		`DELETE Account
		WHERE ID = ${payload.id}
		`,
	retrieve: params =>
    `SELECT * 
    FROM Account a inner join Job j On a.Id = j.Construction_ID 
    WHERE a.ID = ${params.id};`,
	retrieveJobs: params =>
    `SELECT Supply_ID, Supplier_ID, Name, Price
    FROM Job j natural join SupplyList s natural join Item i natural join Supplies
    WHERE j.Job_ID = ${params.Job_ID};`,
	isSupplier: params =>
    `SELECT *
    FROM Account
    WHERE ID = ${params.id}
    AND isSupplier = 1`
};

module.exports = query;
