const query = {
	create: (key, userID) =>
		`INSERT INTO Session(
			session_id,
			ID,
			login_date
		)VALUES(
			${key},
			${userID},
			CURRDATE()
		);`,
	check: payload =>
		`SELECT *
		FROM Session
		WHERE session_key = '${payload.key}' `,
	remove: payload =>
		`DELETE FROM Session
		WHERE ID = '${userID}' `
};


module.exports = query;
