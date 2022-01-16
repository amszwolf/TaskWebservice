'use strict';

module.exports = function(app) {
	var taskList = require('../controllers/taskListController');

	// taskList all tasks
	// usage: GET http://localhost:3000/tasks/
	app.route('/tasks')
		.get(taskList.list_all_tasks); //retrieve all

	//route: create/update a task
	//usage: post (postman)		originalUrl	"/tasks/create?TaskName=hltask4&DueDate=2022-01-30"	string
	//client: originalUrl	"/tasks/create/taskname=MyTask1&duedate=2022%2F01%2F20"	string
	app.route('/tasks/create/:taskname?/:duedate?')
		.post(taskList.create_a_task) //create
		.put(taskList.update_a_task);  //update

	//route: retrieve tasks
	//usage:GET http://localhost:3000/tasks/retrieve?duedate=2022-01-01  (12/20/2021 ok)
	//GET http://localhost:3000/tasks/retrieve?taskname=task4
	app.route('/tasks/retrieve/:taskname?/:duedate?/:status?')
		.get(taskList.read_many_task);

	//task delete
	//usage : DELETE http://localhost:3000/tasks/delete?taskname=task4
	app.route('/tasks/delete/:taskname?')
		.delete(taskList.delete_a_task);
};
