const addSupplyToSupplyList = payload  =>
	`INSERT INTO SupplyList(
	Job_ID,
	Quantity,
	Supply_ID
	) Values (
		'${payload.job_id}',
		'${payload.quantity}',
		'${payload.supply_id}'
	);`;

const addSupplyToSupplyListMultiple = payloadstring =>
`INSERT INTO SupplyList(
	Job_ID,
	Quantity,
	Supply_ID
	) Values
	${payloadstring}
	ON DUPLICATE KEY UPDATE Quantity = Quantity + values(Quantity);
	;`;

module.exports = {
	deleteJobSupplies,
	addSupplyToSupplyList,
	addSupplyToSupplyListMultiple,
};
