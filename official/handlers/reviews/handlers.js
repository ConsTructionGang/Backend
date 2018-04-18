const database = require('../database');
const query = require('./query');

function publish(request, reply){
	database.runQuery(query.isSupplier(request.params), function(results) {
		if(!results[0].isSupplier) {
			return reply({
				message: "Only permitted to review suppliers"
			}).code(400);
		} else {
			database.runQuery(query.authorIsSupplier(request.payload), function(results) {
				if(results[0].isSupplier) {
					return reply({
						message: "Cannot review another supplier"
					}).code(400);
				} else {
					database.runQuery(query.alreadyReviewed(request.payload, request.params), function(result) {
						if (result.length) {
							return reply({
								message: "Cannot re-review a company"
							}).code(400);
						} else {
							insertReview(request, reply);
						}
					});
				}
			});
		}
	});
}

function insertReview(request, reply) {
	database.runQuery(query.post(request), function(results, err) {
		if (err) {
			return reply({
				message: "Problem publishing review"
			}).code(400);
		} else {
			updateAvgRating(request, function() {
				return reply({
					message: "Review has been published"
				}).code(200);
			});
		}
	});
}

function retrieveAll(request, reply) {
	database.runQuery(query.isSupplier(request.params), function(results) {
		if(results.length == 0 || !results[0].isSupplier){
			return reply({
				message: "Page not found"
			}).code(404);
		} else {
			database.runQuery(query.retrieve(request.params), function(results) {
				return reply({
					results
				}).code(200);
			});
		}
	});
}

function remove(request, reply) {
	database.runQuery(query.remove(request.payload, request.params), function(results, err) {
		if (err) {
			return reply({
				message: "Error occured when deleting review"
			}).code(400);
		} else {
			updateAvgRating(request, function() {
				return reply({
					message: "Review has been deleted"
				}).code(200);
			});
		}
	});
}

function updateAvgRating(request, callback) {
	console.log(`Rating edited for ${request.params.supplier_id}`);
	database.runQuery(query.updateAvgScore(request.params), callback);
}

module.exports = {
	publish,
	remove,
	retrieveAll
};



