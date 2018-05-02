/* query.js
* Honeyscape
*"Database queries for account managment"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/
const query = {
	//Retrieves email. If exists, will return email, else NULL
	checkEmail: payload =>
		`SELECT Email
		FROM Account
		WHERE Email = '${payload.email}';`,
	//Determines if password is correct. Else NULL
	checkPassword: payload =>
		`SELECT Name, ID, isSupplier
		FROM (
			SELECT *
			FROM Account
			WHERE Email = '${payload.email}'
		) AS t
		WHERE Password = '${payload.password}';`,
	//Add supplier account
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
	//Add regular use account
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
		//Changes user password based on email
	changePassword: payload =>
		`UPDATE Account
		SET Password = '${payload.newpassword}'
		WHERE Email = '${payload.email}';`,


//Updates user information based on changes
	edit: payload =>
		`UPDATE Account_ID
		SET
			Email = ${payload.email},
			Name = ${payload.name},
			Address = ${payload.address},
			City = ${payload.city},
			State = ${payload.state}
		WHERE ID = ${payload.id};`,

	//Returns user info
	retrieveInfo: params =>
		`SELECT
			ID,
			Name,
			Email,
			isSupplier as Type
		FROM Account a
		WHERE a.ID = ${params.id};`,

	//If supplier exists returns info , else NULL
	isSupplier: params =>
		`SELECT *
		FROM Account
		WHERE ID = ${params.id}
		AND isSupplier = 1`
};

module.exports = query;
