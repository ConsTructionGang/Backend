const query = {
	create: (key, userID) =>
		`INSERT INTO Sessions(
			session_id,
			ID,
			login_date
		)VALUES(
			'${key}',
			${userID},
			CURDATE()
		) ON DUPLICATE KEY
		UPDATE session_id = '${key}';`,
	check: key =>
		`SELECT *
		FROM Sessions
		WHERE session_id = '${key}' `,
	remove: payload =>
		`DELETE FROM Sessions
		WHERE ID = '${userID}' `
};


module.exports = query;
