const helpers = require('../handler_helpers');
const query = require('./query');

function view(request, reply) {
	helpers.runQuery(query.isSupplier(request.params), function(results) {
		if (results.length == 0 || !results[0].isSupplier) {
			return reply({ message: "Page not found" }).code(404);
		} else {
			helpers.runQuery(query.retrieve(request.params), function(result) {
				return reply({result}).code(200);
			});
		}
	});
}

function viewAll(request, reply) {
	helpers.runQuery(query.retrieveAll(), function(results) {
		return reply({results}).code(200);
	});
}

module.exports = {
	view,
	viewAll
};