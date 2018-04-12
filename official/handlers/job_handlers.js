const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function createJob(request, reply) {
    insertJob(request.payload, reply);
}

function insertJob(payload, reply) {
    if(!helpers.fullyDefined(payload,
        ["construction_id", "job_title", "budget", "location", "completion_date"])) {
         return reply("bad parameter error").code(400);
     }

    database.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(query.addJob(payload), function(error) {
            if (error) {
                console.log("ERROR OCCURRED WHEN INSERTING JOB");
                console.log(error);
                reply("Problem occured when creating job").code(400);
            } else {
                reply("Job created");
            }
        });
    });
}

module.exports = {
    createJob
};

