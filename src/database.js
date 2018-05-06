/*
	Use this .js file to store all queries pertaining to the database in order to hide implementation
	of the query from the server.js
*/
const mysql = require("mysql");

// Creates a connection to the database hosted on AWS by utilizing a 
// connection pool
const database = mysql.createPool({
	host: "construction-tracker.cpomc4xq6ovd.us-east-1.rds.amazonaws.com",
	user: "backend",
	password: "database",
	database: "backend_database"
});

/** 
 * Run basic queries and return a promise result that can be resolved in a promise chain 
 * @param query query string being supplied by the handler
 * @returns resolve object that contains results of query
 * @throws reject obtect that is handled in the promise catch block
 * */
function runQueryPromise(query){
	return new Promise( (resolve, reject) => {
		database.query(query, function(error, results) {
			if (error) reject(error);
			resolve(results);
		});
	});

}

// 
function runQuery(query, callback){
	database.query(query, function(error, results) {
		return callback(error, results);
	});
}
module.exports = {
	runQuery,
	runQueryPromise,
};
