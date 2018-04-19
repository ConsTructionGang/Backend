const database = require('../database');
const query = require('./query');

function publish(request, reply){
	database.runQuery(query.isSupplier(request.params), function(error, results) {
		if(!results[0].isSupplier) {
			return reply({
				message: "Only permitted to review suppliers"
			}).code(400);
		} else {
			database.runQuery(query.authorIsSupplier(request.payload), function(error, results) {
				if(results[0].isSupplier) {
					return reply({
						message: "Cannot review another supplier"
					}).code(400);
				} else {
					database.runQuery(query.alreadyReviewed(request.payload, request.params), function(error, result) {
						if (result.length) {
							return reply({
								message: "Cannot re-review a company"
							}).code(400);
						} else {
							insert(request, reply);
						}
					});
				}
			});
		}
	});
}

function insert(request, reply) {
	database.runQuery(query.post(request), function(error) {
		if (error) {
			console.log(error);
			return reply({
				message: "ERROR OCCURED WHEN PUBLISHING REVIEW"
			}).code(500);
		} else {
			return reply({
				message: "Review has been published"
			}).code(200);
		}
	});
}

function retrieveAll(request, reply) {
	database.runQuery(query.isSupplier(request.params), function(error, results) {
		if(results.length == 0 || !results[0].isSupplier){
			return reply({
				message: "Page not found"
			}).code(404);
		} else {
			database.runQuery(query.retrieve(request.params), function(error, results) {
				return reply({
					results
				}).code(200);
			});
		}
	});
}

function remove(request, reply) {
	database.runQuery(query.remove(request.payload, request.params), function(error) {
		if (error) {
			console.log(error);
			return reply({
				message: "ERROR OCCURED WHEN REMOVING REVIEW"
			}).code(500);
		} else {
			return reply({
				message: "Review has been deleted"
			}).code(200);
		}
	});
}

module.exports = {
	publish,
	remove,
	retrieveAll
};



