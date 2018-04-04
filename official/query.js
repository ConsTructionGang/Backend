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
    );`;

  changePassword: payload =>
    `UPDATE Account 
    SET Password = '${payload.newpassword}'
    WHERE Email = '${payload.email}';`;

  checkUser: payload =>
    `SELECT Password
    FROM ACCOUNT
    WHERE EMAIL = '${payload.email}';`;
    
  checkAccount: payload =>
    `SELECT *
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
