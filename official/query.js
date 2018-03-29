const query = {
  basicSelect: parameters =>
    `SELECT ${parameter} FROM Account WHERE ${parameter} = '${data}';`,
  addUser: payload =>
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
    );`,
  checkUser: payload =>
    `SELECT Password
    FROM ACCOUNT
    WHERE EMAIL = '{payload.email}';`,
  checkAccount: payload =>
    `SELECT *
    FROM (
    SELECT Password
    FROM Account
    WHERE Username = ${payload.name}
    OR Email = ${payload.name}
    ) AS t
    WHERE Password = ${payload.password};`
};

module.exports = query;
