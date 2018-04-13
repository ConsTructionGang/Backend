const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function createUser(request, reply) {
    if(!helpers.fullyDefined(request.payload,
       ["name", "password", "email", "city", "state"])) {
        return reply("bad parameter error").code(400);
    }
 
    const checkEmailExists = helpers.fillParameters("Email");

    checkEmailExists(request.payload.email, function(result){
        if(result.length !== 0) {
            return reply("Account already exists. Please log in").code(400);
        } else {
            insertUser(request.payload, reply);
        }
    });
}

function insertUser(payload, reply) {
    database.getConnection(function(err, connection) {
        connection.query(query.addUser(payload), function(error){
        connection.release();
        if (error) {
            console.log("code 400: PROBLEM OCCURED");
            console.log(error);
            return reply("PROBLEM OCCURED").code(400);
        }
        return reply("Account created").code(200);
        });
        if (err) throw error;
    });
}

module.exports = createUser;
