const database = require('./database');

function fullyDefined (payload, parameter) {
    for(let i = 0; i < parameter.length; i++) {
        if(payload[parameter[i]] === undefined) {
            return false;
        }
    }
    return true;
}

function fillParameters(parameter) {
    function runquery(data, callback){
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

module.exports = {
  fullyDefined,
  fillParameters
}
