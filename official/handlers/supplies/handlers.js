/* handlers.js
* Honeyscape
* "function handlers for supplies management"
* By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

//Important query handler for database
const database = require('../database');

//Import neccesary query files
const supplies = require('./query');

function create(request, reply) {
	request.payload.id = request.params.id;
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
	request.payload.id = request.params.id;
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
	request.payload.id = request.params.id;
	database.runQueryPromise(supplies.removeAsSupplier(request.payload))
		.then(() => {
			return database.runQueryPromise(supplies.removeFromSupplyListAsSupplier(request.payload))
		}).then(() => {
			return reply({message: "supplies deleted"}).code(200);
		}).catch((error) => {
			console.log(error);
			return reply().code(400);
		});
}

function editPrice(request, reply) {
	database.runQueryPromise(supplies.editPrice(request.payload))
		.then(() => {
			return reply({message: "price changed"}).code(200);
		}).catch((error) => {
			console.log(error)
			return reply().code(400);
		});
}

module.exports = {
	create,
	editPrice,
	view,
	retrieveTypes,
	addToJob,
	remove,
};
