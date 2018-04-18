const database = require('./database');

function fullyDefined (payload, parameter) {
	for(let i = 0; i < parameter.length; i++) {
		if(payload[parameter[i]] === undefined) {
			console.log(parameter[i] + " is undefined");
			return false;
		}
	}
	return true;
}



module.exports = {
	fullyDefined,
	fillParameters,
};
