const database = require("./database");
const query = require("./query");
const helpers = require("./handler_helpers");

function loginUser(request, reply) {
  if(!helpers.fullyDefined(request.payload, ["email","password"])) {
      return reply("bad parameter error;").code(400);
  } else {
    checkPassword(request.payload, function(results){
        if(results === 0){
            return reply("No way jose").code(400);
        } else {
            return reply("You just signed in").code(200);
        }
    });
  }
}

function runQuery() {

}

function checkPassword(payload, callback) {
    database.getConnection(function(err, connection) {
        connection.query(query.checkAccount(payload), function(
            error, 
            results
        ) {
            connection.release();
            if (error) throw error;
            return callback(results.length);
        });
        if (err) throw error;
    });
}
module.exports = loginUser;
