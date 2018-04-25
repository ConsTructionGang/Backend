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

	database.runQuery(session.create(sessID, userID))
	.then((results) => {
		return sessID
	}).catch((error) => {
		throw new Error('session-not-created')
	});
}


//Deletes any open session for a user
function delete(userID){
  database.runQueryPromise(session.remove(userID))
  .then((results) => {
	  return
  }).catch((error) => {
	  throw new Error('session-not-deleted')
  })
}


//Checks if their is an active session for the user and returns boolean
function check(userID){
  database.runQueryPromise(session.check(userID))
  .then((results) => {
	  return (results.length === 0) ? false, true
  }).catch((error) => {
	  throw new Error('session-not-checked')
  });
}


module.exports = {
  create,
  delete,
  check
};
