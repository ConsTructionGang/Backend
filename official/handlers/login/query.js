const query = {
	checkAccount: payload =>
		`SELECT Name, ID
		FROM (
			SELECT *
			FROM Account
			WHERE Email = '${payload.email}'
		) AS t
		WHERE Password = '${payload.password}';`
};

module.exports = query;
