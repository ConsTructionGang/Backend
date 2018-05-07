/* handlers.js
* Honeyscape
*"function handlers for Reviews management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

//Important query handler for database
const database = require('../database');

//Import neccesary query files
const review = require('./query');
const account = require('../account/query');

// Publish a review for a supplier company from the perspective of a construction company
function publish(request, reply){
	database.runQueryPromise(account.isSupplier(request.params))
		.then( (results) => {
			if(!results[0].isSupplier) throw 'not-a-Supplier';
			return database.runQueryPromise(review.authorIsSupplier(request.payload));
		}).then( (results) => {
			if(results[0].isSupplier) throw 'author-Is-Supplier';
			return database.runQueryPromise(review.alreadyReviewed(request.payload, request.params));
		}).then( (results) => {
			if (results.length) throw 're-review';
			return database.runQueryPromise(review.post(request));
		}).then( () => {
			return reply({
				message: "Review has been published"
			}).code(200);
		}).catch( (error) => {
			errorHandler(reply, error);
		});
}

// Dispute a published review as a supplier.
function dispute(request, reply) {
	database.runQueryPromise(review.dispute(request.payload))
		.then( () => {
			return reply().code(200);
		}).catch((error) => {
			console.log(error);
			return reply().code(400);
		});
}

// Retrieve all reviews attached to a supplier.
function retrieveAll(request, reply) {
	database.runQueryPromise(account.isSupplier(request.params))
		.then( (results) => {
			if(results.length == 0 || !results[0].isSupplier) throw 'no-page';
			return database.runQueryPromise(review.retrieve(request.params));
		}).then( (results) => {
			return reply({
				results
			}).code(200);
		}).catch( (error) => {
			errorHandler(reply, error);
		});
}

// Removes a review.
function remove(request, reply) {
	database.runQueryPromise(review.remove(request.params))
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
	retrieveAll,
	dispute
};
