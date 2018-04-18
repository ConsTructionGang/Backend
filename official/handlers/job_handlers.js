const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function createJob(request, reply) {
	insertJob(request.payload, reply);
}

function insertJob(payload, reply) {
	if(!helpers.fullyDefined(payload,
		["construction_id", "job_title", "budget", "address",
		 "city", "state", "start_date"])) {
		return reply("bad parameter error").code(400);
	}
	database.getConnection(function(err, connection) {
		if(err) throw err;
		console.log("creating connnection");
		connection.query(query.addJob(payload), function(error, results) {
			if (error) {
				console.log("ERROR OCCURRED WHEN INSERTING JOB");
				console.log(error);
				reply("Problem occured when creating job").code(400);
			} else {
				console.log(results);
				reply("Job Created").code(200);
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

function addTask(request, reply) {
	if(!helpers.fullyDefined(request.payload,["job_id", "taskname", "priority",
	"creation_date", "estimated_date"])) {
		return reply("bad parameter error").code(400);
	}	
	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.addTask(request.payload), function(error) {
			if (error) {
				console.log("ERROR OCCURRED WHEN TASK TO JOB");
				console.log(error);
				reply("Problem occured when creating job").code(400);
			} else {
				reply({'message': "Task added"}).code(200);
			}
		});
	})
}
module.exports = {
	createJob,
	addSupplyToJob,
	addTask,
};

