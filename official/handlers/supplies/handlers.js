const database = require('../database');
const query = require('./query');

function create(request, reply) {
	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.create(request.payload), function(error) {
			if (error) {
				console.log("ERROR OCCURRED WHEN ADDING JOB");
				console.log(error);
				reply("SQL QUERY ERROR").code(400);
			} else {
				reply("Supply Added");
			}
		});
	});
}

function view(request, reply) {
	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.view(request.payload), function(error, results) {
			if (error) {
				console.log("ERROR VIEWING SUPPLIES");
				console.log(error);
				reply("SQL QUERY ERROR").code(400);
			} else {
				reply(results).code(200);
			}
		});
	});
}

function add(request, reply){
	let string = "";
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
		connection.query(query.add(string), function(error) {
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

function remove(request, reply) {

}

function viewTagged(request, reply) {
	database.runQuery(query.viewSuppliesTagged(request.params), function(error, results) {
		if (error) {
			console.log("ERROR VIEWING SUPPLIES");
			console.log(error);
			return reply("SQL QUERY ERROR").code(400);
		} else {
			return reply(results).code(200);
		}
	});
	return;
}

function viewTaggedMultiple(request, reply) {
	let arr = request.params.tag.split('_');
	let string = "";
	for(let i = 0; i < arr.length; i++) {
		string += "Tags LIKE '%";
		string += arr[i];
		string += "%' ";
		if(i != arr.length - 1) {
			string += 'OR ';
		}
	}
	database.runQuery(query.viewSuppliesTaggedMultiple(string), function(error, results) {
		if (error) {
			console.log("ERROR VIEWING SUPPLIES");
			console.log(error);
			return reply("SQL QUERY ERROR").code(400);
		} else {
			return reply(results).code(200);
		}
	});
	return;
}

function viewSortedASC(request, reply) {
	database.runQuery(query.viewSuppliesSortedASC(request.params), function(error, results) {
		if (error) {
			console.log("ERROR VIEWING SUPPLIES");
			console.log(error);
			return reply("SQL QUERY ERROR").code(400);
		} else {
			return reply(results).code(200);
		}
	});
	return;
}

function viewSortedDSC(request, reply) {
	database.runQuery(query.viewSuppliesSortedDSC(request.params), function(error, results) {
		if (error) {
			console.log("ERROR VIEWING SUPPLIES");
			console.log(error);
			return reply("SQL QUERY ERROR").code(400);
		} else {
			return reply(results).code(200);
		}
	});
	return;
}

module.exports = {
	create,
	view,
	add,
	remove,
	viewTagged,
	viewTaggedMultiple,
	viewSortedASC,
	viewSortedDSC,
};