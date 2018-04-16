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
		connection.query(query.addJob(payload), function(error, results) {
			if (error) {
				console.log("ERROR OCCURRED WHEN INSERTING JOB");
				console.log(error);
				reply("Problem occured when creating job").code(400);
			} else {
				reply(results);
			}
		});
	});
}

function addSupplyToJob(request, reply){
	let string = "";
	if(!helpers.fullyDefined(request.payload,["job_id", "supplies"])) {
		return reply("bad parameter error").code(400);
	}
	let data = JSON.parse(request.payload.supplies);
	for (let i = 0; i < data.length; i++) {
		string += '(';
		string += request.payload.job_id + ', ';
		string += data[i]['quantity'] + ', ';
		string += data[i]['supply_id'] + ')';
		if(i != data.length-1) {
			string += ',';
		}
	}

	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.addSupplyToSupplyListMultiple(string), function(error) {
			if (error) {
				console.log("ERROR OCCURRED WHEN INSERTING JOB");
				console.log(error);
				reply("Problem occured when creating job").code(400);
			} else {
				reply("supplies added");
			}
		});
	});
}

module.exports = {
	createJob,
	addSupplyToJob,
};

