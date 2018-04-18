const database = require('../database');
const query = require('./query');

function create(request, reply) {
	insert(request.payload, reply);
}

function insert(payload, reply) {
	database.runQuery(query.add(payload), function(error, results) {
		if (error) {
			console.log("ERROR OCCURRED WHEN INSERTING JOB");
			console.log(error);
			reply("Problem occured when creating job").code(400);
		} else {
			console.log(results);
			reply("Job Created").code(200);
		}
	});
}

function remove(payload, reply) {

}

module.exports = {
	create,
	remove
};

