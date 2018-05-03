const query = {
	create: payload =>
		`INSERT INTO Supplies (
			Supply_ID,
			Supplier_ID,
			Price
		)  Values (
			'${payload.supply_id}',
			'${payload.id}',
			'${payload.price}'
		);`,
	view: payload =>
		`SELECT i.Name product_name, Price, i.supply_id
		FROM Supplies s NATURAL JOIN Item i INNER JOIN Account a
		ON s.Supplier_ID = a.ID
		WHERE a.ID = ${payload.id};`,
	retrieve: job_ID =>
	`SELECT sl.Supply_ID as id, Name as name, Supplier_ID as SupplierID
	FROM SupplyList sl inner join Item i 
	ON sl.Supply_ID = i.Supply_ID
	WHERE sl.Job_ID = ${job_ID};`,
	retrieveBySupplier: params =>
		`SELECT Supply_ID as id, Name as name
   		FROM Item i natural join Supplies
		WHERE Supplies.Supplier_ID = ${params.supplier_id};`,
	addToList: payloadstring =>
		`INSERT INTO SupplyList(
			Job_ID,
			Supply_ID
			Supplier_ID
		) Values
		${payloadstring}
		ON DUPLICATE KEY UPDATE Quantity = Quantity + values(Quantity);`,
	retrieveAll: () =>
		`SELECT *
		FROM Item;`,
	remove: payload =>
		`DELETE FROM SupplyList
		WHERE JobList_ID = '${payload.list_id}';`,
	removeAsSupplier: payload =>
		`DELETE FROM Supplies
		WHERE Supplier_ID = ${payload.id}
		AND Supply_ID = ${payload.supply_id};`,
	removeFromSupplyListAsSupplier: payload =>
		`UPDATE SupplyList
		SET Supplier_ID = NULL
		WHERE Supplier_ID = ${payload.id}
		AND Supply_ID = ${payload.supply_id};`,
	editPrice: payload =>
		`UPDATE Supplies
		SET Price = ${payload.price}
		WHERE Supplier_ID = ${payload.id}
		AND Supply_ID = ${payload.supply_id};`
};

module.exports = query;
