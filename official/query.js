const query = {
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
      );`
};

module.exports = query;
