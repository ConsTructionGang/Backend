const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function createSession(payload){
  database.getConnection(function(err, connection) {
    console.log("Server processing a query request");
    connection.query(query.createSession(payload), function(error, results){
      connection.release();
      if (error) throw error;
    });
    if (err) throw err;
  });
  database.getConnection(function(err, connection) {
    console.log("Server processing a query request");
    connection.query(query.getSession(payload), function(error, results){
      connection.release();
      if (error) throw error;
      return results[0].session_key;
    });
    if (err) throw err;
  });
}
function deleteSession(payload){
  database.getConnection(function(err, connection) {
    console.log("Server processing a query request");
    connection.query(query.deleteSession(payload), function(error, results){
      connection.release();
      if (error) throw error;
    });
    if (err) throw err;
  });
}
function checkSession(payload){
  database.getConnection(function(err, connection) {
    console.log("Server processing a query request");
    connection.query(query.checkSession(payload), function(error, results){
      connection.release();
      if (error) throw error;
      if(results[0].session_key != NULL){
        return false
      }
      else{
        return true;
      }
    });
    if (err) throw err;
  });
}
module.exports = {
  createSession,
  deleteSession,
  checkSession
};
