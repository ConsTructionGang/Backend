const database = require('../database');
const query = require('./query');

function view(request, reply) {
	if (!request.params.supplier_id) {
		viewAll(request, reply);
	} else {
		database.runQuery(query.isSupplier(request.params), function(error, results) {
			console.log(results);
			if (results.length == 0 || !results[0].isSupplier) {
				return reply({ message: "Page not found" }).code(404);
			} else {
				database.runQuery(query.retrieve(request.params), function(error, result) {
					return reply({result}).code(error ? 500 : 200);
				});
			}
		});
	}
}

function viewAll(request, reply) {
	database.runQuery(query.retrieveAll(), function(error, results) {
		return reply({results}).code(error ? 500 : 200);
	});
}

module.exports = {
	view
};