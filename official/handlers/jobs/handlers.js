const database = require('../database');
const query = require('./query');

function create(request, reply) {
	database.runQueryPromise(query.isSupplier(request.params))
		.then( (results) => {
			if (results[0].isSupplier) throw 'no-page';
			database.runQueryPromise(query.add(request.payload, request.params));
		}).then( () => {
			return reply({
				message: "Job created"
			}).code(200);
		}).catch( (error) => {
			if(error === 'no-page') {
				return reply().code(404);
			} else {
				console.log(error);
				return reply().code(500);
			}
		});
}

function remove(request, reply) {

}

function retrieveAll(request, reply) {
	database.runQueryPromise(query.isSupplier(request.params))
		.then( (results) => {
			if (results[0].isSupplier) throw 'no-page';
			database.runQueryPromise(query.retrieveAll(request.params));
		}).then( (results) => {
			return reply(results).code(200);
		}).catch( (error) => {
			if (error === 'no-page') {
				return reply().code(404);
			} else {
				console.log(error);
				return reply().code(500);
			}
		});
}

module.exports = {
	create,
	remove,
	retrieveAll,
};

