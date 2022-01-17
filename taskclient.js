#!/usr/bin/env node

var http = require('http');
var program = require('commander');
const querystring = require('querystring');

const winston = require("winston");

// logger : error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logfile.log" })
    ]
});

var options;
// 用于请求的选项
var options_ListAll = {
    host: 'localhost',
    port: '3000',
    //path: '/index.html'
    path: '/tasks',
    method: 'GET'
};


/* function requirement:
 * 	tasks add "write some code" 21/08/2019
 * 
 * task update "unit test" "done"
 * 
	tasks list
	tasks list --expiring-today
	tasks done 3

tasks delete "unit test"
 */


//S
program
    .version('0.0.1')
    //.option('-C, --chdir <path>', 'change the working directory')
    //.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    //.option('-T, --no-tests', 'ignore test hook')

//list all: node taskclient.js list  -a
//list expired: node taskclient.js list  2022 / 01 / 01 - x
program
    .command('list [duedate]')

    .description('list tasks')

    .option('-a, --all', 'list all tasks')
    .option('-x, --expiringtoday', 'list task expiring-today')
    .option('-c, --completed', 'TBC: list Task had been completed')

    .action(function (duedate, cmd) {
        //console.log('list taskname', (taskname));
        console.log('list duedate', (duedate));
        //console.log('list status', (status));
        console.log('list', (cmd.all), (cmd.expiringtoday), (cmd.completed));
        //var isWatch = option.x ? true : false;
        if (cmd.all) {
            console.log('list:options_ListAll');
            options = options_ListAll;
        } else if (cmd.expiringtoday) {
            console.log('list:expiringtoday');

            //no duedate, use today  undefined
            var TodayDateStr = new Date().toISOString().slice(0, 10);
            var duedateStr = TodayDateStr;

            if ((duedate == undefined)) {
                duedateStr = TodayDateStr;
                console.log('no duedate , use today: %d', duedateStr);
            } else {
                console.log('has duedate ,no use today: %s', duedate);

                // parseDate valid
                parsedValue = Date.parse(duedate);
                if (isNaN(parsedValue)) {  //not a  valid date format
                    console.log('%s not a valid date', duedate);
                    //throw new commander.InvalidArgumentError('Not a date.');
                    process.exit(1);
                } else {// valid format
                    console.log('%s IS a valid date', duedate);
                    duedateStr = duedate;
                }
            }

            //console.log('%s queue date', parsedValue.toString("MM/dd/yyyy"));
            //var parsedValue1 = parsedValue.toISOString();

            var MyQuery = {
                //'taskname': taskname,
                'duedate': duedateStr,
                //'status': mystatus,
            };
            var MyQueryStr = querystring.stringify(MyQuery);

            var options_ListSome = {
                host: 'localhost',
                port: '3000',
                path: '/tasks/retrieve?' + MyQueryStr,
                method: 'GET',
            }
            options = options_ListSome;

        }
        else if (cmd.completed) {
            console.log('list:completed');
            var MyQuery = {
                //'taskname': taskname,
                //'duedate': duedateStr,
                'status': 'completed',
            };
            var MyQueryStr = querystring.stringify(MyQuery);

            var options_Listcompleted = {
                host: 'localhost',
                port: '3000',
                path: '/tasks/retrieve?' + MyQueryStr,
                method: 'GET',
            }
            options = options_Listcompleted;
        }
        else {
            console.log('list:options_ListAll');
            options = options_ListAll;
        } 
    });

//node tasks.js create "MyTask1" 2022/01/20
program
    .command('create <taskname> [duedate] [status]')  //sttatus: ['pending', 'ongoing', 'completed']

    .description('create a task')

    //.option('-a, --all', 'list all tasks')
    //.option('-x, --expiringtoday', 'list task expiring-today')
    //.option('-d, --done', 'list task had been completed')

    //parameter order should be the same as command, and param cmd should be the the last
    .action(function (taskname, duedate, status, cmd) {
        console.log('create taskname', (taskname));
        console.log('create duedate', (duedate));
        console.log('create status', (status));
        console.log('list', (cmd.all), (cmd.expiringtoday), (cmd.done));

        // parseDate valid
        var parsedValue = Date.parse(duedate);
        if (isNaN(parsedValue)) {  //undefined
            console.log('%s not a valid date', duedate);
            //throw new commander.InvalidArgumentError('Not a date.');
        } else { console.log('%s IS a valid date', duedate); }
      
        var mystatus = (isNaN(status)) ? status : 'ongoing';
        var MyQuery = {
            'taskname': taskname,
            'duedate': duedate,
            'status': mystatus,
        };
        var MyQueryStr = querystring.stringify(MyQuery);

        var options_CreateTask = {
            host: 'localhost',
            port: '3000',
            path: '/tasks/create?' + MyQueryStr,
            method: 'POST',            
        }
        
        options = options_CreateTask;

    });


//node taskclient.js update hltask10 completed -s
program
    .command('update <taskname> [status]')  //sttatus: ['pending', 'ongoing', 'completed']

    .description('update a task, param [duedate] need follow opeion -d, and [status] -s')

    //.option('-d, --duedate', 'task update duedate')
    .option('-s, --status', 'task update status')

    //parameter order should be the same as command, and param cmd should be the the last
    .action(function (taskname, status, cmd) {
        console.log('create taskname', (taskname));
        //console.log('create duedate', (duedate));
        console.log('create status', (status));
        console.log('create options', (cmd.duedate), (cmd.status));

        //// parseDate valid
        //var parsedValue = Date.parse(duedate);
        ////if (isNaN(parsedValue)) {
        ////    console.log('%s not a valid date', duedate);
        ////} else { console.log('%s IS a valid date', duedate); }
        //var duedatestr = duedate;
        //if ((cmd.duedate) && (!isNaN(parsedValue))){
        //    duedatestr = duedate;
        //} else {
        //    duedatestr = '';
        //}

        //check status
        logger.info( status );
        let taskstatusarray = ['pending', 'ongoing', 'completed'];
        var mystatusstr = status;
        if ((cmd.status) && taskstatusarray.includes(status)) { mystatusstr = status; }
        else { mystatusstr = '';}
        logger.info( mystatusstr);

        var MyQuery = {
            'taskname': taskname,
            //'duedate': duedatestr,
            'status': mystatusstr,
        };
        var MyQueryStr = querystring.stringify(MyQuery);

        var options_UpdateTask = {
            host: 'localhost',
            port: '3000',
            path: '/tasks/create?' + MyQueryStr,
            method: 'PUT',
        }

        options = options_UpdateTask;

    });

//node tasks.js delete "MyTask1"
program
    .command('delete [taskname]') 

    .description('delete a/some task')

    .option('-a, --all', 'TBC: delete all tasks')
    //.option('-x, --expiringtoday', 'delete task expiring-today')
    //.option('-d, --done', 'delete specific status tasks')

    //parameter order should be the same as command, and param cmd should be the the last
    .action(function (taskname, duedate, status, cmd) {
        var MyQuery = {
            'taskname': taskname,
            //'duedate': duedate,
            //'status': mystatus,
        };
        var MyQueryStr = querystring.stringify(MyQuery);

        var options_deleteTask = {
            host: 'localhost',
            port: '3000',
            path: '/tasks/delete?' + MyQueryStr,
            method: 'DELETE',
        }

        options = options_deleteTask;

    });

program.parse(process.argv);


//var options = options_ListAll;

//http://localhost:3000/tasks

// 处理响应的回调函数
var callback = function (response) {
    // 不断更新数据
    var body = '';
    response.on('data', function (data) {
        body += data;
    });

    response.on('end', function () {
        // 数据接收完成
        console.log(body);
    });
}

// 向服务端发送请求
var req = http.request(options, callback);
//console.log(req);
req.end();