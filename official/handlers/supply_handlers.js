const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function addSupply(request, reply) {
      if(!helpers.fullyDefined(request.payload,
            ["supplier_id", "name", "tags", "price"])) {
             return reply("bad parameter error").code(400);
      }
      database.getConnection(function(err, connection) {
            if(err) throw err;
            connection.query(query.addSupply(request.payload), function(error) {
                if (error) {
                    console.log("ERROR OCCURRED WHEN ADDING JOB");
                    console.log(error);
                    reply("SQL QUERY ERROR").code(400);
                } else {
                    reply("Supply Added");
                }
            });
        });
};

module.exports = {
      addSupply,
}