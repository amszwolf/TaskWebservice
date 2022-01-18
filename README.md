0: Task webservice, using RESTful, programming language is NodeJS. Tested under Windows 10 and Linux.


1, Operation to run code

1.1 clone the project
* https://github.com/amszwolf/TaskWebservice

1.2  Installations
* npm install

1.3  Run webservice
* npm run start
or 
* node server.js

1.4 Run Client, command line with params
* help: node taskclient.js -h
Usage: taskclient [options] [command]

Options:
  -V, --version                                   output the version number
  -h, --help                                      display help for command

Commands:
  list [options] [duedate]                        list tasks
  create [options] <taskname> [duedate] [status]  create a task
  update <taskname> [duedate] [status]            update a task
  delete [options] [taskname]                     delete a/some task
  help [command]                                  display help for command

  some examples:
* list all tasks: node taskclient.js list  -a
* list tasks expiring today: node taskclient.js list  --expiringtoday
* list tasks expiring someday: node taskclient.js list 2022-01-01 --expiringtoday
* create task: node taskclient.js create "MyTask1" 2022/01/20
* update task status: node taskclient.js update task10 completed -s
* delete task: node taskclient.js delete mytask5

1.5, Unit test:
In work directory, run 
* mocha 
or
* npm test

2, The architecture, plese refer to TaskWebserviceDiagram.png or TaskWebserviceDiagram.vsdx in source code directory Doc

3, The logfile is logfile.log in work directory, all operation could be loged in this logfile. 