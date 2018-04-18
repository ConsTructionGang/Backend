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


function runQuery(query, callback){
	database.query(query, function(err, results) {
		if (err) throw err;
		return callback(results);
	});
}

module.exports = runQuery;
