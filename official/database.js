/*
	Use this .js file to store all queries pertaining to the database in order to hide implementation
	of the query from the server.js
*/
const mysql = require("mysql");

const database = mysql.createPool({
	host: "construction-tracker.cpomc4xq6ovd.us-east-1.rds.amazonaws.com",
	user: "backend",
	password: "database",
	database: "backend_database"
});

// Function to run basic queries

function runQueryPromise(query, callback){
	return new Promise( (resolve, reject) => {
		database.query(query, function(error, results) {
			if (error) reject(error);
			resolve(results);
		});
	});

}
function runQuery(query, callback){
	database.query(query, function(error, results) {
		return callback(error, results);
	});
}
module.exports = {
	runQuery,
	runQueryPromise,
};
