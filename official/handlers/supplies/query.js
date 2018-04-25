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
	view: () =>
		`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
		FROM Supplies s inner join Account a
		ON s.Supplier_ID = a.ID;`,
	retrieve: job_ID =>
		`SELECT Supply_ID as id, Supplier_ID as supplierId, Name as name
   		FROM Job j natural join SupplyList s natural join Item i natural join Supplies
    	WHERE j.Job_ID = ${job_ID};`,
	addToSupplyList: payloadstring =>
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