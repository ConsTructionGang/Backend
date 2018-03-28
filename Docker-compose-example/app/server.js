import { connect } from 'http2';

'use strict';

const Hapi = require('hapi');
const mysql = require('mysql');

const server = new Hapi.Server();
server.connection({port: 5000, host: '0.0.0.0'});


 //Create connection with docker container that is running on the local
 //machine
const database = mysql.createPool({
    host: 'mysql',
    user: 'root',
    password: '',
    database: 'test'
});

//Adds the inert plugin to Hapi
//Creates static page
//Used to serve images, stylesheets and static pages
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    //Registers /hello route and tells server to reply with
    //Content of hello.html
    //Run route within register to ensure that all plugins
    //exist when code runs
    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./hello.html');
        }
    });
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        console.log('Server processing a / request');
        reply('Hello, world');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log('Server processing /name request');
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'GET',
    path: '/table',
    handler: function (request, reply) {
        database.getConnection(function(err, connection){
            console.log('Server processing a query request')
            connection.query('SELECT * FROM person', function(error, results, fields) {
                reply(results);
                connection.release();
                if(error) throw error;
            });
            if (err) throw error;
        });
    }
});


server.start((err) => {
    if(err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
