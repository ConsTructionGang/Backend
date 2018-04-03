const Hapi = require('hapi');
const server = new Hapi.Server();
const database = require('./database');
const express = require('express')
const session = require('express-session');

const register_handler = require('./register_handlers');
const login_handler = require('./login_handlers');

server.connection({ port: 5000, host: "0.0.0.0" });

server.route({
  method: "GET",
  path: "/",
  handler: function(request, reply) {
    console.log("Server processing a / request");
    reply("Hello, worlds");
  }
});

server.route({
  method: "GET",
  path: "/signup",
  handler: function(request, reply) {
    if (err) throw err;
    return reply("Signup page").code(200);
  }
});

server.route({
  method: "POST",
  path: '/signup',
  handler: register_handler
});

server.route({
  method: "GET",
  path: '/login',
  handler: function(request, reply) {
    if(err) throw err;
    return reply("Login page").code(200);
  }
});

server.route({
  method: "POST",
  path: '/login',
  handler: login_handler
});

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
