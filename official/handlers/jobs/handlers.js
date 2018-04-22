const database = require('../database');
const query = require('./query');

function create(request, reply) {
	database.runQuery(query.isSupplier(request.payload), function(error, results) {
		if (error) {
			console.log(error);
			return reply({msg:"page not found"}).code(404);
		}
		if (results[0].isSupplier){
			return reply({msg:"page not found"}).code(404);
		} else {
			database.runQuery(query.add(request.payload, request.params), function(error) {
				let msg;
				if (error) {
					console.log("ERROR OCCURRED WHEN INSERTING JOB");
					console.log(error);
					msg = "Problem occured when creating job";
				} else {
					msg = "Job Created";
				}
				return reply({
					message: msg
				}).code(error ? 500 : 200);
			});
		}
	});
}

function remove(request, reply) {

}

function retrieveAll(request, reply) {
	database.runQuery(query.isSupplier(request.params), function(error, results) {
		if (error) {
			console.log(error);
			return reply({msg:"page not found"}).code(404);
		}
		if (results[0].isSupplier){
			return reply({msg:"page not found"}).code(404);
		} else {
			database.runQuery(query.retrieveAll(request.params), function(error, results) {
				if(error) console.log(error);
				return reply({
					results
				}).code(error ? 500 : 200);
			});
		}
	});
}

function job(_data) {
	const data = _data;
	async function createJob() {
		return database.runQuery(
			`SELECT Supply_ID, Supplier_ID, Name, Price
			FROM Job j natural join SupplyList s natural join Item i natural join Supplies
			WHERE j.Job_ID = ${data.Job_ID};`
		).then( (results) => {
			return {
				id: data.Job_ID,
				title: data.Job_Title,
				address: data.Address,
				city: data.City,
				state: data.State,
				cost: data.Budget,
				start_date: data.Start_Date,
				end_date: data.Completion_Date,
				status: (null) ? 'In Progress' : 'Complete',
				supplies: results
			}
		}).catch( (error) => {
			console.log(error)
			return reject(error);
		})
	}

	return {
		create: () => createJob()
	}
}

function retrieve(request, reply) {
	let jobList = [];
	// place the queries in the query file
	// formatting the response
	// formatting the code!!!!!!!!!!!!!!!!!!!!!!!!!
	database.runQueryPromise(`SELECT * FROM Account a inner join Job j On a.Id = j.Construction_ID where a.ID = 1;`)
	.then( (jobInfo) => {
		account.id = jobInfo[0]["ID"];
		account.email = jobInfo[0]["Email"];
		account.type = jobInfo[0]["Type"];
		account.name = jobInfo[0]["Name"]
		for (let i = 0; i < jobInfo.length; i++) {
			jobList.push(new job(jobInfo[i]));
		}
		for (let i = 0; i < jobList.length; i++) {
			jobList[i] = Promise.resolve(jobList[i].create());
		}
		return Promise.all(jobList).then(function(newlist) {
			return newlist
		})
	}).then( (jobs) => {
		//run query to add supplies
		account.jobs = jobs
		return reply(account).code(200);
	}).catch( (error) => {
		console.log(error);
		return reply().code(500);
	})
}
module.exports = {
	create,
	remove,
	retrieveAll
};

