/* handlers.js
* Honeyscape
*"function handlers for supplies management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

const database = require('../database');
const supplies = require('./query');

function create(request, reply) {
	database.runQueryPromise(supplies.create(request.payload))
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
	database.runQueryPromise(supplies.view(request.params))
		.then((results) => {
			return reply(results).code(200);
		}).catch((error) => {
			console.log(error);
			return reply({
				message: "Problem viewing supplies"
			}).code(500);
		});
}

function addToJob(request, reply){
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

	database.runQueryPromise(supplies.addToList(string))
		.then(() => {
			return reply({
				message: "Supplies added"
			}).code(200);
		}).catch((error) => {
			console.log(error);
			return reply({
				message: "Problem occured when adding supply"
			}).code(500);
		});
}

function retrieveTypes(request, reply) {
	database.runQueryPromise(supplies.retrieveAll())
		.then((results) => {
			return reply({results}).code(200);
		}).catch((error) => {
			console.log(error);
			return reply().code(500);
		});
}

function remove(request, reply) {
	database.runQueryPromise(supplies.removeAsSupplier(request.payload))
	.then(() => {
		return database.runQueryPromise(supplies.removeFromSupplyListAsSupplier(request.payload))
	}).then(() => {
		return reply({message: "supplies deleted"}).code(200);
	}).catch((error) => {
		console.log(error);
		return reply().code(400);
	})

};

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

function editPrice(request, reply) {
	database.runQueryPromise(supplies.editPrice(request.params))
	.then(() => {
		return reply({message: "price changed"}).code(200);
	}).catch((error) => {
		console.log(error)
		return reply().code(400);
	})
}

module.exports = {
	create,
	view,
	retrieveTypes,
	addToJob,
	remove,
	viewTagged,
	viewTaggedMultiple,
	viewSortedASC,
	viewSortedDSC,
};
