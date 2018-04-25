/* handlers.js
* Honeyscape
*"function handlers for suppliers management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

const database = require('../database');
const suppliers = require('./query');
const account = require('../account/query');

function view(request, reply) {
	if (!request.params.supplier_id) {
		viewAll(request, reply);
	} else {
		database.runQuery(account.isSupplier(request.params))
			.then((results) => {
				if (results.length == 0 || !results[0].isSupplier){
					return reply({
						message: "Page not found"
					}).code(404);
				} else {
					database.runQuery(query.retrieve(request.params));
				}
			}).then( (results) => {
				return reply({results}).code(200);
			}).catch((error) => {
				console.log(error);
				return reply().code(500);
			});
	}
}

function viewAllSuppliersID(request, reply) {
	database.runQuery(suppliers.retrieveAllByID(request.params))
		.then( (results) => {
			if (results.length == 0 ) {
				return reply({ message: "Page not found" }).code(404);
			} else {
				return reply ({results}).code(200);
			}
		}).catch( (error) => {
			console.log(error);
			return reply().code(500);
		});
}

function viewAllSuppliersName(request, reply) {
	database.runQuery(suppliers.retrieveAllByName(request.params))
		.then( (results) => {
			if (results.length == 0) {
				return reply({ message: "Page not found" }).code(404);
			} else {
				return reply({results}).code(200);
			}
		}).catch( (error) => {
			console.log(error);
			return reply().code(500);
		});
}

function viewAll(request, reply) {
	database.runQuery(suppliers.retrieveAll())
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
