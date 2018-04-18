const query = {
	createSession: payload =>
		`INSERT INTO Session_manager(
			session_key,
			ID
		)VALUES(
			Rand(),
			'${payload.ID}'
		);`,
	checkSession: payload =>
		`SELECT *
		FROM Session_manager
		WHERE session_key = '${payload.key}' `,
	removeSession: payload =>
		`DELETE FROM Session_manager
		WHERE ID = '${payload.ID}' `
};


module.exports = query;