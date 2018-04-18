const database = require('../database');
const query = require('./query');

function view(request, reply) {
	database.runQuery(query.isSupplier(request.params), function(error, results) {
		if (results.length == 0 || !results[0].isSupplier) {
			return reply({ message: "Page not found" }).code(404);
		} else {
			database.runQuery(query.retrieve(request.params), function(error, result) {
				return reply({result}).code(200);
			});
		}
	});
}

function viewAll(request, reply) {
	database.runQuery(query.retrieveAll(), function(error, results) {
		return reply({results}).code(200);
	});
}

module.exports = {
	view,
	viewAll
};