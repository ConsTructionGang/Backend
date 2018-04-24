const query = {
	checkEmail: payload =>
		`SELECT Email
		FROM Account
		WHERE Email = '${payload.email}';`,
	checkPassword: payload =>
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
	delete: payload =>
		`DELETE Account
		WHERE ID = ${payload.id};
		`,
	retrieveInfo: params =>
		`SELECT 
			ID, 
			Name, 
			Email,
			isSupplier as Type
		FROM Account a
		WHERE a.ID = ${params.id};`,
	isSupplier: params =>
		`SELECT *
		FROM Account
		WHERE ID = ${params.id}
		AND isSupplier = 1`
};

module.exports = query;
