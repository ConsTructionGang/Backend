
const Hapi = require('hapi');
const server = new Hapi.Server();
const account_handler = require('./account/handlers');
const job_handler = require('./jobs/handlers');
const review_handler = require('./reviews/handlers');
const supply_handler = require('./supplies/handlers');
const supplier_handler = require('./suppliers/handlers');
const task_handler = require('./tasks/handlers');


server.connection({ port: 5000, host: "0.0.0.0",
	routes: {
		cors: {
			origin: ["*"],
			headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Content-Type"],
			credentials: true
			// additionalHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers",
			// "Content-Type", "Accept-Language"],
			// additionalExposedHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers",
			// "Content-Type", "Origin", "Accept-Language"]
		}
	},
});
server.auth.strategy('session', 'cookie');

// Account

server.route({
	method: "GET",
	path: '/login',
	handler: function(request, reply, err) {
		if(err) throw err;
		return reply("Login page").code(200);
	}
});

server.route({
	method: 'PUT',
	path: '/login',
	handler: account_handler.login
});

server.route({
	method: 'GET',
	path: '/logout',
	handler: function(request, reply) {
		return reply("logout page").code(200);
	}
})

server.route({
	method: "GET",
	path: "/signup",
	handler: function(request, reply, err) {
		if (err) throw err;
		return reply("Signup page").code(200);
	}
});

server.route({
	method: "POST",
	path: "/signup",
	handler: account_handler.register
});

server.route({
	method: "DELETE",
	path: '/deleteaccount',
	handler: account_handler.remove
});

server.route({
	method: "POST",
	path: '/changepassword',
	handler: account_handler.changePassword
});

// Suppliers + Reviews

server.route({
	method: "GET",
	path: "/suppliers/{supplier_id?}",
	handler: supplier_handler.view
});

server.route({
	method: "GET",
	path: "/supplies/name={supply}",
	handler: supplier_handler.viewAllSuppliersName
});

server.route({
	method: "GET",
	path: "/supplies/id={supply_id}",
	handler: supplier_handler.viewAllSuppliersID
});

server.route({
	method: "GET",
	path: '/suppliers/{supplier_id}/reviews',
	handler: review_handler.retrieveAll
});

server.route({
	method: "PUT",
	path: '/suppliers/{supplier_id}/reviews',
	handler: review_handler.publish
});

server.route({
	method: "DELETE",
	path: '/suppliers/{supplier_id}/reviews',
	handler: review_handler.remove
});

//Reviews - Dispute

server.route({
	method: "PUT",
	path: '/suppliers/{supplier_id}/dispute',
	handler: function() {
		console.log('do something');
	}
});

server.route({
	method: "GET",
	path: '/suppliers/{supplier_id}/supplies',
	handler: supply_handler.view
});

server.route({
	method: "GET",
	path: '/supplies/{tag}/m=1',
	handler: supply_handler.viewTaggedMultiple
});

server.route({
	method: "GET",
	path: '/view/supplies/{tag}',
	handler: supply_handler.viewTagged
});

server.route({
	method: "GET",
	path: '/view/supplies/s=0{tag}',
	handler: supply_handler.viewSortedASC
});

server.route({
	method: "GET",
	path: '/view/supplies/s=1{tag}',
	handler: supply_handler.viewSortedDSC
});

server.route({
	method: "POST",
	path: '/jobs/create/{id}',
	handler: job_handler.create
});

server.route({
	method: 'GET',
	path: '/jobs/{id}',
	handler: job_handler.retrieveAll
});

server.route({
	method: "DELETE",
	path: '/jobs/{job_id}',
	handler: job_handler.remove
});

server.route({
	method: "POST",
	path: '/supplies/add',
	handler: supply_handler.create
});

// Task manager for jobs

server.route({
	method: "GET",
	path: '/jobs/{job_id}/tasks',
	handler: task_handler.retrieve
});

server.route({
	method: "PUT",
	path: '/jobs/{job_id}/tasks',
	handler: task_handler.create
});

server.route({
	method: "DELETE",
	path: '/jobs/{job_id}/tasks',
	handler: task_handler.remove
});

server.route({
	method: "PATCH",
	path: "/jobs/{job_id}/tasks",
	handler: task_handler.complete
});

server.route({
	method: "POST",
	path: '/user/{job_id}/addsupplies',
	handler: supply_handler.add
});

server.route({
	method: "GET",
	path: '/tester',
	handler: account_handler.retrieve
})

server.start(err => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});
