const basicSelect = parameters =>
	`SELECT ${parameter} 
	FROM Account 
	WHERE ${parameter} = '${data}';`;
	
	
const checkUser = payload =>
	`SELECT Password
	FROM ACCOUNT
	WHERE EMAIL = '${payload.email}';`;
	
const checkAccount = payload =>
	`SELECT *
	FROM (
	SELECT Password
	FROM Account
	WHERE Email = '${payload.email}'
	) AS t
	WHERE Password = '${payload.password}';`;

const addUser = payload => 
	`INSERT INTO Account(
		Name,
		Email,
		Password,
		Location
	) VALUES (
		'${payload.name}',
		'${payload.email}',
		'${payload.password}',
		'${payload.location}'
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
	`INSERT INTO Jobs(
        Construction_ID,
        Job_Title,
        List_ID,
        Location,
        Budget,
        Completion_Date
    ) Values (
        '${payload.construction_id}',
        '${payload.job_title}',
        '${payload.list_id}',
        '${payload.location}',
        '${payload.budget}',
        '${payload.completion_date}'
    );`;

module.exports = {
	basicSelect,
	addUser,
	checkUser,
	checkAccount,
	changePassword,
	addJob,
	deleteJob,
	deleteJobSupplies
};
