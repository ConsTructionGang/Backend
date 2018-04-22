const database = require('../database');
const query = require('./query');

function publish(request, reply){
	database.runQuery(query.isSupplier(request.params))
		.then( (results) => {
			if(!results[0].isSupplier)
				return reply({
					message: "Only permitted to review suppliers"
				}).code(400);
			database.runQuery(query.authorIsSupplier(request.payload));
		}).then( (results) => {
			if(results[0].isSupplier)
				return reply({
					message: "Cannot review another supplier"
				}).code(400);
			database.runQuery(query.alreadyReviewed(request.payload, request.params));
		}).then( (results) => {
			if (results.length)
				return reply({
					message: "Cannot re-review a company"
				}).code(400);
			database.runQuery(query.post(request));
		}).then( () => {
			return reply({
				message: "Review has been published"
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply().code(500);
		});
}

function retrieveAll(request, reply) {
	database.runQuery(query.isSupplier(request.params))
		.then( (results) => {
			if(results.length == 0 || !results[0].isSupplier)
				return reply({
					message: "Page not found"
				}).code(404);
			database.runQuery(query.retrieve(request.params));
		}).then( (results) => {
			return reply({
				results
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply().code(500);
		});
}

function remove(request, reply) {
	database.runQuery(query.remove(request.payload, request.params))
		.then( () => {
			return reply({
				message: "Review has been deleted"
			}).code(200);
		}).catch( (error) => {
			console.log(error);
			return reply({
				message: "ERROR OCCURED WHEN REMOVING REVIEW"
			}).code(500);
		});
}

module.exports = {
	publish,
	remove,
	retrieveAll
};



