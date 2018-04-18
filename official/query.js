const basicSelect = parameters =>
	`SELECT ${parameters}
	FROM Account
	WHERE ${parameters} = '${data}';`;

const checkUser = payload =>
	`SELECT Password
	FROM ACCOUNT
	WHERE EMAIL = '${payload.email}';`;

const checkAccount = payload =>
	`SELECT Name, ID
	FROM (
	SELECT *
	FROM Account
	WHERE Email = '${payload.email}'
	) AS t
	WHERE Password = '${payload.password}';`;

const createSession = payload =>
	`INSERT INTO Session_manager(
		session_key,
		ID
	)VALUES(
		Rand(),
		'${payload.ID}'
	);`;
	
const checkSession = payload =>
	`SELECT *
	FROM Session_manager
	WHERE session_key = '${payload.key}' `;

const removeSession = payload =>
	`DELETE FROM Session_manager
	WHERE ID = '${payload.ID}' `;

const addSupplier = payload =>
	`INSERT INTO Account(
		Name,
		Email,
		Password,
		City,
		State,
		Address,
		isSupplier
	) VALUES (
		'${payload.name}',
		'${payload.email}',
		'${payload.password}',
		'${payload.city}',
		'${payload.state}',
		'${payload.address}',
		${payload.type}
	);`;

const addUser = payload =>
	`INSERT INTO Account(
		Name,
		Email,
		Password,
		isSupplier
	) VALUES (
		'${payload.name}',
		'${payload.email}',
		'${payload.password}',
		${payload.type}
	);`;

const changePassword = payload =>
	`UPDATE Account
	SET Password = '${payload.newpassword}'
	WHERE Email = '${payload.email}';`;

const deleteJobSupplies = payload =>
	`DELETE FROM SupplyList
	WHERE JobList_ID = '${payload.list_id}';`;

const deleteJob = payload =>
	`DELETE FROM Job
	WHERE List_ID = '${payload.list_id}';`;

const addJob = payload =>
	`INSERT INTO Job(
		Construction_ID,
		Job_Title,
		Address,
		City,
		State,
		Budget,
		Start_Date
	) Values (
		'${payload.construction_id}',
		'${payload.job_title}',
		'${payload.address}',
		'${payload.city}',
		'${payload.state}',
		'${payload.budget}',
		'${payload.start_date}'
	);`;
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

const addTask = payload =>
	`INSERT INTO Task (
		Job_ID,
		Name,
		Description,
		Priority,
		Creation_Date,
		Estimated_Date
	) VALUES (
		'${payload.job_id}',
		'${payload.taskname}',
		'${payload.description}',
		'${payload.priority}',
		'${payload.creation_date}',
		'${payload.estimated_date}'
	);`;
module.exports = {
	basicSelect,
	addUser,
	addSupplier,
	checkUser,
	checkAccount,
	changePassword,
	addJob,
	deleteJob,
	deleteJobSupplies,
	addSupply,
	viewSupplies,
	viewSuppliesTagged,
	viewSuppliesTaggedMultiple,
	viewSuppliesSortedASC,
	viewSuppliesSortedDSC,
	addSupplyToSupplyList,
	addSupplyToSupplyListMultiple,
	addTask
};
