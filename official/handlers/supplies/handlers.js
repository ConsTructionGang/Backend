/* handlers.js
* Honeyscape
* "function handlers for supplies management"
* By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

//Important query handler for database
const database = require('../database');

//Import neccesary query files
const supplies = require('./query');

/**
 *	Creates a new supply given a price, item id and supplier id.
 */
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

/**
 *	View all supplies from a particular supplier.
 *	Retrieves Product Name, Price and Supply ID.
 */
function view(request, reply) {
	console.log(request.params);
	database.runQueryPromise(supplies.view(request.params))
		.then((results) => {
			return reply(results).code(200);
		}).catch((error) => {
			console.log(error);
			return reply({
				message: "Problem viewing supplies"
			}).code(400);
		});
}

/**
 *	Retrieves supplies array from request payload, and creates 
 *	a string that is interacts directly with a mysql script.
 */
function addToJob(request, reply){
	request.payload.id = request.params.id;
	let string = "";
	let data;
	try {
		data = JSON.parse(request.payload.supplies);
	} catch (error) {
		data = request.payload.supplies;
	}
	for (let i = 0; i < data.length; i++) {
		string += '(';
		string += request.params.job_id + ', ';
		string += data[i]['id'] + ', '
		string += ((!(data[i]['SupplierID']))  ? 'NULL' : data[i]['SupplierID'])  + ')';
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

/**
 *	Retrieves every type of supply, pulling directly from the item table. 
 */
function retrieveTypes(request, reply) {

	database.runQueryPromise(supplies.retrieveAll())
		.then((results) => {
			return reply({results}).code(200);
		}).catch((error) => {
			console.log(error);
			return reply().code(500);
		});
}

/**
 *	This function directly interacts with two tables. First, removes the supply
 *	in its entirety from the Supplies table (given a valid supplier id), then 
 *	sets to NULL the Supplier ID field of every Supplylist tuple who matches on
 *	SupplierID, SupplyID.
 */
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
/**
 *	Updates the price of any suppliers particular supply,
 */
function editPrice(request, reply) {
	request.payload.id = request.params.id;
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
