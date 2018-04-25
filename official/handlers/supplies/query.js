const query = {
	create: payload =>
		`INSERT INTO Supplies (
			Supplier_ID,
			Name,
			Tags,
			Price
		)  Values (
			'${payload.supplier_id}',
			'${payload.name}',
			'${payload.tags}',
			'${payload.price}'
		);`,
	viewAll: () =>
		`SELECT *
		FROM Supplies Join Item
		ORDER BY Name;`,
	retrieveList: job_ID =>
		`SELECT Supply_ID as id, Supplier_ID as supplierId, Name as name
   		FROM Job j natural join SupplyList s natural join Item i natural join Supplies
    	WHERE j.Job_ID = ${job_ID};`,
	add: payloadstring =>
		`INSERT INTO SupplyList(
			Job_ID,
			Quantity,
			Supply_ID
		) Values
		${payloadstring}
		ON DUPLICATE KEY UPDATE Quantity = Quantity + values(Quantity);
		;`,
	remove: payload =>
		`DELETE FROM SupplyList
		WHERE JobList_ID = '${payload.list_id}';`
};

module.exports = query;
