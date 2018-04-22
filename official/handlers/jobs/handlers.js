const database = require('../database');
const query = require('./query');

function create(request, reply) {
	database.runQuery(query.isSupplier(request.params))
		.then( (results) => {
			if (results[0].isSupplier)
				return reply().code(404);
			database.runQuery(query.add(request.payload, request.params));
		}).then( () => {
			return reply({
				message: "Job created"
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply().code(500);
		});
}

function remove(request, reply) {

}

function retrieveAll(request, reply) {
	database.runQuery(query.isSupplier(request.params))
		.then( (results) => {
			if (results[0].isSupplier)
				return reply().code(404);
			database.runQuery(query.retrieveAll(request.params));
		}).then( (results) => {
			return reply(results).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply().code(500);
		});
}

module.exports = {
	create,
	remove,
	retrieveAll
};

