const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function createJob(request, reply) {
    insertJob(request.payload, reply);
}

function insertJob(payload, reply) {
    database.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(query.addJob(payload), function(error) {
            if (error) {
                console.err("ERROR OCCURRED WHEN INSERTING JOB");
                reply("Problem occured when creating job").code(400);
            } else {
                reply("Job created");
            }
        });
    });
}

function addSupplies(payload, reply) {

}

module.exports = {

}
