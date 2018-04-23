const database = require('../database');
const supplies = require('./query');

function create(request, reply) {
	database.runQuery(supplies.create(request.payload))
		.then(() => {
			return reply({
				message: "Supplies addded"
			}).code(200);
		}).catch((error) => {
			console.log(error);
			return reply({
				message: "Problem adding supplies"
			}).code(500);
		}); 
}

function view(request, reply) {
	database.runQuery(supplies.view(request.payload))
		.then((results) => {
			return reply({results}).code(200);
		}).catch((error) => {
			console.log(error);
			return reply({
				message: "Problem viewing supplies"
			}).code(500);
		});
}

function add(request, reply){
	let string = "";
	let data = JSON.parse(request.payload.supplies);
	for (let i = 0; i < data.length; i++) {
		string += '(';
		string += request.params.job_id + ', ';
		string += data[i]['quantity'] + ', ';
		string += data[i]['supply_id'] + ')';
		if(i != data.length-1) {
			string += ',';
		}
	}

	database.runQuery(supplies.add(string))
		.then(() => {
			return reply({
				message: "Supplies added"
			}).code(200);
		}).catch((error) => {
			console.log(error);
			return reply({
				message: "Problem occured when creating job"
			}).code(500);
		});
}

function remove(request, reply) {

}

function viewTagged(request, reply) {
	database.runQuery(supplies.viewTagged(request.params), function(error, results) {
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
	database.runQuery(supplies.viewTaggedMultiple(string), function(error, results) {
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
	database.runQuery(supplies.viewSortedASC(request.params), function(error, results) {
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
	database.runQuery(supplies.viewSortedDSC(request.params), function(error, results) {
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