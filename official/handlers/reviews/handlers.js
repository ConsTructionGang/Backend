const database = require('../database');
const query = require('./query');

function publish(request, reply){
	database.runQuery(query.isSupplier(request.params))
		.then( (results) => {
			if(!results[0].isSupplier) throw 'not-a-Supplier';
			database.runQuery(query.authorIsSupplier(request.payload));
		}).then( (results) => {
			if(results[0].isSupplier) throw 'author-Is-Supplier';
			database.runQuery(query.alreadyReviewed(request.payload, request.params));
		}).then( (results) => {
			if (results.length) throw 're-review';
			database.runQuery(query.post(request));
		}).then( () => {
			return reply({
				message: "Review has been published"
			}).code(200);
		}).catch( (error) => {
			errorHandler(reply, error);
		});
}

function retrieveAll(request, reply) {
	database.runQuery(query.isSupplier(request.params))
		.then( (results) => {
			if(results.length == 0 || !results[0].isSupplier) throw 'no-page';
			database.runQuery(query.retrieve(request.params));
		}).then( (results) => {
			return reply({
				results
			}).code(200);
		}).catch( (error) => {
			errorHandler(reply, error);
		});
}

function remove(request, reply) {
	database.runQuery(query.remove(request.payload, request.params))
		.then( () => {
			return reply({
				message: "Review has been deleted"
			}).code(200);
		}).catch( (error) => {
			errorHandler(reply, error);
		});
}

function errorHandler(reply, error) {
	if (error === "no-page") {
		return reply({ 
			message: "Page not found" 
		}).code(404);
	} else if (error === 'not-a-Supplier') {
		return reply({
			message: "Only permitted to review suppliers"
		}).code(400);
	} else if (error === 'author-Is-Supplier') {
		return reply({
			message: "Cannot review another supplier"
		}).code(400);
	} else if (error === 're-review') {
		return reply({
			message: "Cannot re-review a company"
		}).code(400);
	} else {
		console.log(error);
		return reply().code(500);
	}
}

module.exports = {
	publish,
	remove,
	retrieveAll
};



