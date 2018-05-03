/* handlers.js
* Honeyscape
*"function handlers for suppliers management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

//Important query handler for database
const database = require('../database');

//Import neccesary query files
const suppliers = require('./query');
const reviews = require('../reviews/query');
const supplies = require('../supplies/query');

function view(request, reply) {
	if (request.params.id) request.params.supplier_id = request.params.id;
	console.log(request.param);
	const supplier = {};
	database.runQueryPromise(suppliers.isSupplier(request.params))
		.then((results) => {
			if (results.length == 0 || !results[0].isSupplier) throw 'no-page';
			return database.runQueryPromise(suppliers.retrieve(request.params));
		}).then( (supplierInfo) => {
			console.log(supplierInfo)
			supplier.name = supplierInfo[0]["Name"];
			supplier.email = supplierInfo[0]["Email"];
			supplier.address = supplierInfo[0]["Address"];
			supplier.city = supplierInfo[0]["City"];
			supplier.state = supplierInfo[0]["State"];
			supplier.rating = supplierInfo[0]["Rating"];
			return database.runQueryPromise(reviews.retrieve(request.params));
		}).then( (reviews) => {
			supplier.reviews = reviews;
			return database.runQueryPromise(supplies.retrieveBySupplier(request.params));
		}).then( (supplies) => {
			supplier.supplies = supplies;
			return reply(supplier).code(200);
		}).catch((error) => {
			if (error === "no-page") {
				return reply({ message: "Page not found" }).code(404);
			} else {
				console.log(error);
				return reply().code(500);
			}
		});
}

function viewAllSuppliersID(request, reply) {
	database.runQueryPromise(suppliers.retrieveAllByID(request.params))
		.then( (results) => {
			if (results.length == 0 ) throw 'no-page';

			return reply ({results}).code(200);
		}).catch( (error) => {
			if (error === 'no-page') {
				return reply([]).code(200);
			} else {
				console.log(error);
				return reply().code(500);
			}
		});
}

function viewAllSuppliersName(request, reply) {
	database.runQueryPromise(suppliers.retrieveAllByName(request.params))
		.then( (results) => {
			console.log(results);
			if (results.length == 0 ) throw 'no-page';
			return reply ({results}).code(200);
		}).catch( (error) => {
			if (error === 'no-page') {
				return reply([]).code(200);
			} else {
				console.log(error);
				return reply().code(500);
			}
		});
}

function viewAll(request, reply) {
	database.runQueryPromise(suppliers.retrieveAll())
		.then( (results) => {
			return reply({results}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply().code(500);
		});
}
module.exports = {
	viewAll,
	viewAllSuppliersID,
	viewAllSuppliersName,
	view,
};
