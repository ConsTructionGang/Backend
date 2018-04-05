const basicSelect = parameters =>
	`SELECT ${parameter} 
	FROM Account 
	WHERE ${parameter} = '${data}';`;

const addUser = payload => 
	`INSERT INTO Account(
		Name,
		Email,
		Password,
		Location
    ) VALUES (
		'${payload.name}',
		'${payload.email}',
		'${payload.password}',
		'${payload.location}'
	);`;

const changePassword = payload =>
    `UPDATE Account 
    SET Password = '${payload.newpassword}'
    WHERE Email = '${payload.email}';`;
	
const checkUser = payload =>
    `SELECT Password
    FROM ACCOUNT
    WHERE EMAIL = '${payload.email}';`;
    
const checkAccount = payload =>
    `SELECT *
    FROM (
    SELECT Password
    FROM Account
    WHERE Email = '${payload.email}'
    ) AS t
	WHERE Password = '${payload.password}';`;

module.exports = {
	basicSelect,
	addUser,
	checkUser,
	checkAccount,
	changePassword
};
