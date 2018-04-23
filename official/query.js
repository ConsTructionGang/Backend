<<<<<<< HEAD
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

const createSession = ID =>
	`INSERT INTO Session_manager(
		session_key,
		ID
	)VALUES(
		Rand(),
		'${ID}'
	);`;

const getSession = payload =>
	`SELECT *
	FROM Session_manager
	WHERE ID = '${payload.ID}' `;

const checkSession = payload =>
	`SELECT *
	FROM Session_manager
	WHERE ID = '${payload.ID}' `;

const removeSession = payload =>
	`DELETE FROM Session_manager
	WHERE session_key = '${payload.key}' `;

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
		Location,
		Budget,
		Completion_Date
	) Values (
		'${payload.construction_id}',
		'${payload.job_title}',
		'${payload.location}',
		'${payload.budget}',
		'${payload.completion_date}'
	);`;
=======
>>>>>>> 57c8d9bb38f7bcce76e9f432eeb8bc44f00397f2
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

const authenticate = payload =>
	``
module.exports = {
	authenticate,
	basicSelect,
	addUser,
	addSupplier,
	checkUser,
	checkAccount,
	createSession,
	deleteSession,
	checkSession,
	getSession,
	changePassword,
	addJob,
	deleteJob,
	deleteJobSupplies,
	addSupplyToSupplyList,
	addSupplyToSupplyListMultiple,
};
