const query = {
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
	checkEmail: payload =>
		`SELECT Email
		FROM Account 
		WHERE Email = '${payload.email}';`
};

module.exports = query;