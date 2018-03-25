'use strict';

const Hapi = require('hapi');
const fr  = require('fs'); // imported for file writing
const server = new Hapi.Server();
const mysql = require('mysql'); // imported to communicate with sql
let connection = mysql.createConnection({
    host     : '192.168.99.100', // your local ip
    user     : 'typedef', // your user name
    password : 'password', // your password
    database : 'classicmodels' // the database
});
connection.connect(function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log("successful")
    };
});

server.connection({port: 3000, host: '0.0.0.0'});

server.route({
       method: 'GET',
       path: '/',
       handler: function(request, reply) {
            console.log('Sercer processing a / request');
            /**
             * format: connection.query(<Mysql_query>, function(err, result, fields));
             * err -> any issues from processing the query
             * result ->  the stringified version of result of the query
             * fields -> fields basically explain in detail related data with for each column
             */
            connection.query(`SELECT * FROM employees e WHERE lastName = 'Patterson' LIMIT 1`,
                function (err, result, fields){
                    if(err) throw err;
                    console.log(result);
                    console.log(fields);
                    /**
                     * *NOTE*: not including a reply function will lead to a webpage loading indefinitely,
                     * but multiple replies will cause an error to be thrown. 
                     */
                    reply(result);
                }
            );
       }
});

server.route({
       method: 'GET',
       path: '/{name}',
       handler: function( request, reply) {
            console.log('Server processing /name request');
            let script = fr.readFileSync('scripts');
            script = script.toString();
            /**
             * the script file has one string that is filled with wildcard '?'
             * the following function call replaces the '?' with the name member
             * from the request parameter.
             * I.E. <your_ip>:3000/<name>
             */
            script = script.replace('?', request.params.name);
            connection.query(script,
                function (err, result, fields){
                    if(err) throw err;
                    console.log("processing sql command");
                    reply(result);
                }
            );
       }
});

server.start((err) => {
       if (err) {
              throw err;
       }
    const mysql = require('mysql');
    console.log('Server running at: ${server.info.uri}');
});
