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
	retrieve: payload =>
		`SELECT *
		FROM Account a inner join Job j natural join SupplyList s natural join Item i
		WHERE
			a.ID = 1
		AND
			a.ID = j.Construction_ID;`,
	retrieveAcc: payload =>
		`SELECT a.ID, a.Email, a.Name, Job_ID
		FROM Account a inner join Job j
		ON a.ID = j.Construction_ID
		WHERE a.ID = 1;`
};

module.exports = query;
