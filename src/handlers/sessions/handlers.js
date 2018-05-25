/* handlers.js
* Honeyscape
*"function handlers for session management"
*By:Zach Banducci, Tyrone Criddle, Fernando Corral
*/

//Important query handler for database
const database = require('../database');

//Import neccesary query files
const query = require('./query');


//Creates new session and returns random key value generated for session
function createSession(payload){
	database.runQuery(query.createSession(payload), function(error, results){
	connection.release();
	if (error) throw error;
  });
  database.runQuery(query.getSession(payload), function(error, results){//Get values of current session
	connection.release();
	if (error) throw error;
	return results[0].session_key//Returns key value of current session
  });
}
//Deletes any open session for a user
function deleteSession(payload){
  database.runQuery(query.deleteSession(payload), function(error, results){
	connection.release();
	if (error) throw error;
  });
}
//Checks if their is an active session for the user and returns boolean
function checkSession(payload){
  database.runQuery(query.checkSession(payload), function(error, results){
	connection.release();
	if (error) throw error;
	if(results[0].session_key != NULL){
	  return false
	}
	else{
	  return true;
	}
  });
}
module.exports = {
  createSession,
  deleteSession,
  checkSession
};
