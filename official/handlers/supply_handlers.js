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

function viewSupplies(request, reply) {
	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.viewSupplies(request.payload), function(error, results) {
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

function viewSuppliesTagged(request, reply) {
	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.viewSuppliesTagged(request.params), function(error, results) {
			if (error) {
				console.log("ERROR VIEWING SUPPLIES");
				console.log(error);
				return reply("SQL QUERY ERROR").code(400);
			} else {
				return reply(results).code(200);
			}
		});
	});
	return;
}

function viewSuppliesTaggedMultiple(request, reply) {
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
	database.getConnection(function(err, connection) {
		if(err) throw err;
		console.log(string);
		connection.query(query.viewSuppliesTaggedMultiple(string), function(error, results) {
			if (error) {
				console.log("ERROR VIEWING SUPPLIES");
				console.log(error);
				return reply("SQL QUERY ERROR").code(400);
			} else {
				return reply(results).code(200);
			}
		});
	});
	return;
}

function viewSuppliesSortedASC(request, reply) {
	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.viewSuppliesSortedASC(request.params), function(error, results) {
			if (error) {
				console.log("ERROR VIEWING SUPPLIES");
				console.log(error);
				return reply("SQL QUERY ERROR").code(400);
			} else {
				return reply(results).code(200);
			}
		});
	});
	return;
};

function viewSuppliesSortedDSC(request, reply) {
	database.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(query.viewSuppliesSortedDSC(request.params), function(error, results) {
			if (error) {
				console.log("ERROR VIEWING SUPPLIES");
				console.log(error);
				return reply("SQL QUERY ERROR").code(400);
			} else {
				return reply(results).code(200);
			}
		});
	});
	return;
}

module.exports = {
	addSupply,
	viewSupplies,
	viewSuppliesTagged,
	viewSuppliesTaggedMultiple,
	viewSuppliesSortedASC,
	viewSuppliesSortedDSC,
};