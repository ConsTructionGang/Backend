const database = require('../database');
const query = require('./query');

function create(request, reply) {
	database.runQuery(query.isSupplier(request.params), function(error, results) {
		console.log(results);
		if (results[0].isSupplier){
			return reply().code(404);
		} else {
			database.runQuery(query.add(request.payload, request.params), function(error) {
				let msg;
				if (error) {
					console.log("ERROR OCCURRED WHEN INSERTING JOB");
					console.log(error);
					msg = "Problem occured when creating job";
				} else {
					msg = "Job Created";
				}
				return reply({
					message: msg
				}).code(error ? 500 : 200);
			});
		}
	});
}

function remove(request, reply) {

}

function retrieveAll(request, reply) {
	database.runQuery(query.isSupplier(request.params), function(error, results) {
		if (results[0].isSupplier){
			return reply().code(404);
		} else {
			database.runQuery(query.retrieveAll(request.params), function(error, results) {
				if(error) console.log(error);
				return reply({
					results
				}).code(error ? 500 : 200);
			});
		}
	});
}

module.exports = {
	create,
	remove,
	retrieveAll
};

