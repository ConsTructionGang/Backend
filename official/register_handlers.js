const query = require('./query');

function createUser(request, reply) {
    const userExists = exists("User");
    const emailExists = exists("Email");

    if(userExists(request.payload.username)) 
        return reply("User already exists").code(400);
    if(emailExists(request.payload.email))
        return reply("Account already exists. Please log in").code(400);
    connection.query(query.addUser(
        request.payload.name,
        request.payload.username,
        request.payload.email,
        request.payload.password,
        request.payload.type
    ) + ')', function(error, results, fields) {
        connection.release();
        if(error){
            console.log("code 400: PROBLEM OCCURED");
            reply("PROBLEM OCCURED").code(400);
        }
        reply("Account created").code(200);
    });
    if (err) throw error;
}

function exists(parameter) {
    return function(data) {
        data = tolower(data);
        const query = `SELECT ${parameter} FROM Account WHERE ${parameter} = ${data}`;

        database.getConnection(function(err, connection) {
            console.log("Server processing a query request");
            connection.query("SELECT * FROM Account", function(error, results){
                connection.release();
                if (error) throw error;
                return results[parameter] === undefined ? false : true;
            });
            if (err) throw err;
        });
    };
}