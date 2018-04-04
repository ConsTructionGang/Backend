const basicSelect = parameters =>
	`SELECT ${parameter} 
	FROM Account 
	WHERE ${parameter} = '${data}';`;

const addUser = payload => 
	`INSERT INTO Account(
    Name,
    Username,
    Email,
    Password,
    Type
    ) VALUES (
    '${payload.name}',
    '${payload.username}',
    '${payload.email}',
    '${payload.password}',
    '${payload.type}'
<<<<<<< HEAD
    );`,
  changePassword: payload =>
    `UPDATE Account 
    SET Password = '${payload.newpassword}'
    WHERE Email = '${payload.email}';`,
  checkUser: payload =>
    `SELECT Password
    FROM ACCOUNT
    WHERE EMAIL = '${payload.email}';`,
  checkAccount: payload =>
    `SELECT *
=======
	);`;
	
const checkUser = payload =>
    `SELECT Password
    FROM ACCOUNT
	WHERE EMAIL = '{payload.email}';`;
	
const checkAccount = payload =>
	`SELECT *
>>>>>>> c3a80c355e8baf2343de84c5fd0c1ded875488fa
    FROM (
    SELECT Password
    FROM Account
    WHERE Username = '${payload.name}'
    OR Email = '${payload.name}'
    ) AS t
	WHERE Password = '${payload.password}';`;


module.exports = {
	basicSelect,
	addUser,
	checkUser,
	checkAccount
};
