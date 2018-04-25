/* handlers.js
* Honeyscape
*"function handlers for session managment"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/
const database = require('../database');
const session = require('./query');

const Chance = require('chance');
const chance = new Chance();

//Creates new session and returns random key value generated for session
function create(userID){
	const sessID = chance.hash();

	database.runQueryPromise(session.create(sessID, userID))
	.then().catch((error) => {
		console.log(error)
	});
	return sessID;
}


//Deletes any open session for a user
function remove(userID){
  	database.runQueryPromise(session.remove(userID))
  	.then((results) => {

  	}).catch((error) => {
	  	throw new Error('session-not-deleted')
  	})
}


//Checks if their is an active session for the user and returns boolean
function validate(request, reply){
	database.runQueryPromise(session.check(request.params.sess_id))
	.then((results) => {
		return reply().code(results.length === 0 ? 400 : 200)
	}).catch((error) => {
	  	return reply().code(500)
	});
}


module.exports = {
  create,
  remove,
  validate
};
