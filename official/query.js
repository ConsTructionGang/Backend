const deleteJobSupplies = payload =>
	`DELETE FROM SupplyList
	WHERE JobList_ID = '${payload.list_id}';`;


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

const addSupply = payload =>
	`INSERT INTO Supplies
	(
		Supplier_ID,
		Name,
			Tags,
			Price
	)  Values (
		'${payload.supplier_id}',
		'${payload.name}',
		'${payload.tags}',
		'${payload.price}'
	);`;

const viewSupplies = payload =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM Supplies s inner join Account a
	ON s.Supplier_ID = a.ID;`;

const viewSuppliesTagged = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM
		Supplies s
	INNER JOIN
		Account a
	ON s.Supplier_ID = a.ID
	WHERE Tags LIKE '%${params.tag}%' OR s.Name LIKE '%${params.tag}%';`;

const viewSuppliesTaggedMultiple = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM
		Supplies s
	INNER JOIN
		Account a
	ON s.Supplier_ID = a.ID
	WHERE ${params.tag};`;

const viewSuppliesSortedASC = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM
	Supplies s
	INNER JOIN
	Account a
	ON s.Supplier_ID = a.ID
	WHERE Tags LIKE '%${params.tag}%' OR s.Name LIKE '%${params.tag}%'
	ORDER BY Price ASC;`;

const viewSuppliesSortedDSC = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM
	Supplies s
	INNER JOIN
	Account a
	ON s.Supplier_ID = a.ID
	WHERE Tags LIKE '%${params.tag}%' OR s.Name LIKE '%${params.tag}%'
	ORDER BY Price DESC;`;
 
module.exports = {
	deleteJobSupplies,
	addSupply,
	viewSupplies,
	viewSuppliesTagged,
	viewSuppliesTaggedMultiple,
	viewSuppliesSortedASC,
	viewSuppliesSortedDSC,
	addSupplyToSupplyList,
	addSupplyToSupplyListMultiple,
};
