'use strict';
const Hapi = require('hapi');
const fr = require('fs');
const server = new Hapi.Server({port: 3000, host: '0.0.0.0'});
const mysql = require('mysql');

/**
 * Connection to different servers listed below. 
**/
let connections = [];
// let con1 = mysql.createConnection({
//     host    : '',
//     user    : '',
//     password: '',
//     database: ''
// });
con1.connect(function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log("Connection successful");
    };
});
server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        console.log("DEFAULT");
        return "DEFAULT_STRING";
    }
})

// server start
server.start((err) => {
    if (err) {
           throw err;
    }
 console.log('Server running at: ${server.info.uri}');
});



