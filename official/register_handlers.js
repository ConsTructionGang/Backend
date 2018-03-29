const database = require('./database');
const query = require('./query');

function createUser(request, reply) {
    const checkUserExists = fillParameters("Username");
    const checkEmailExists = fillParameters("Email");

    checkUserExists(request.payload.username, function(result){
        if(result.length !== 0) {
            return reply("User already exists").code(400);
        } else {
            checkEmailExists(request.payload.email, function(result){
                if(result.length !== 0) {
                    return reply("Account already exists. Please log in").code(400);
                } else {
                    database.getConnection(function(err, connection) {
                        connection.query(query.addUser(request.payload),
                        function(error, results, fields) {
                            connection.release();
                            if(error){
                                console.log("code 400: PROBLEM OCCURED");
                                return reply("PROBLEM OCCURED").code(400);
                            }
                            return reply("Account created").code(200);
                        });
                        if (err) throw error;
                    });
                }
            });
        }
    });
}

function fillParameters(parameter) {
    function runquery(data, callback) {
        data = data.toLowerCase();
        const query = `SELECT ${parameter} FROM Account WHERE ${parameter} = '${data}'`;

        database.getConnection(function(err, connection) {
            console.log("Server processing a query request");
            connection.query(query, function(error, results){
                connection.release();
                if (error) throw error;
                return callback(results);
            });
            if (err) throw err;
        });
    }
    
    return runquery;
}

module.exports = createUser;