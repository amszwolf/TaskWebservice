////#!/usr/bin/env node

var http = require('http');
var program = require('commander');
const querystring = require('querystring');

var options;
// 用于请求的选项
var options_ListAll = {
    host: 'localhost',
    port: '3000',
    //path: '/index.html'
    path: '/tasks',
    method: 'GET'
};

//var options_ListOne = {
//    host: 'localhost',
//    port: '3000',
//    //path: '/index.html'
//    path: '/tasks/create',
//    method: 'GET'
//};



/*
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
//{
//    var arguments = process.argv.splice(2);
//    console.log('所传递的参数是：', arguments);

//    //
//    // print process.argv
//    process.argv.forEach(function (val, index, array) {
//        console.log(index + ': ' + val);
//    });
//}

// let isValidDate = Date.parse('03/17/21');
// if (isNaN(isValidDate))

//function myParseDate(value, dummyPrevious) {
//    // parseDate 参数为字符串和进制数
//    const parsedValue = Date.parse(value);
//    if (isNaN(parsedValue)) {
//        throw new commander.InvalidArgumentError('Not a date.');
//    }
//    return parsedValue;
//}

//S
program
    .version('0.0.1')
    //.option('-C, --chdir <path>', 'change the working directory')
    //.option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
    //.option('-T, --no-tests', 'ignore test hook')

//list all: node tasks.js list  -a
//list expired: node tasks.js list  2022 / 01 / 01 - x
program
    .command('list [duedate]')

    .description('list tasks')

    .option('-a, --all', 'list all tasks')
    .option('-x, --expiringtoday', 'list task expiring-today')
    .option('-d, --done', 'TBC: list Task had been completed')

    .action(function (duedate, cmd) {
        //console.log('list taskname', (taskname));
        console.log('list duedate', (duedate));
        //console.log('list status', (status));
        console.log('list', (cmd.all), (cmd.expiringtoday), (cmd.done));
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
                //'duedate': duedate,
                //'duedate': parsedValue.toString(),
                'duedate': duedateStr,
                //'duedate': parsedValue.toISOString().slice(0, 10),
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
        //else if (cmd.done) {
        //    console.log('list:done');
        //    options = options_ListAll;
        //}
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
    .option('-d, --done', 'list task had been completed')

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

//node tasks.js create "MyTask1" 2022/01/20
program
    .command('update <taskname> [duedate] [status]')  //sttatus: ['pending', 'ongoing', 'completed']

    .description('update a task')

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
        if (isNaN(parsedValue)) {
            console.log('%s not a valid date', duedate);
            //throw new commander.InvalidArgumentError('Not a date.');
        } else { console.log('%s IS a valid date', duedate); }

        //const postData = JSON.stringify({
        //    'taskname': taskname,
        //    'duedate': duedate,
        //});

        //let params = new URLSearchParams();
        //params.set("taskname", taskname);
        //params.set("duedate", duedate);

        //this.options.search = params;

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
            //method: 'GET'
            //headers: {
            //    'Content-Type': 'application/json',
            //    'Content-Length': Buffer.byteLength(postData)
            //search: params
            //query: {
            //    'taskname': taskname,
            //    'duedate': duedate
            //},

        }

        options = options_CreateTask;

        //options = options_ListAll;

        //var isWatch = option.x ? true : false;
        //if (cmd.all) {
        //    console.log('list:options_ListAll');
        //    options = options_ListAll;
        //} else if (cmd.expiringtoday) {
        //    console.log('list:expiringtoday');
        //    options = options_ListAll;
        //} else if (cmd.done) {
        //    console.log('list:done');
        //    options = options_ListAll;
        //} else {
        //    console.log('list:options_ListAll');
        //    options = options_ListAll;
        //}
    });

//node tasks.js create "MyTask1" 2022/01/20
program
    .command('delete [taskname]') 

    .description('delete a/some task')

    .option('-a, --all', 'TBC: delete all tasks')
    //.option('-x, --expiringtoday', 'delete task expiring-today')
    //.option('-d, --done', 'delete specific status tasks')

    //parameter order should be the same as command, and param cmd should be the the last
    .action(function (taskname, duedate, status, cmd) {
        //console.log('delete taskname', (taskname));
        //console.log('delete duedate', (duedate));
        //console.log('delete status', (status));
        //console.log('delete', (cmd.all), (cmd.expiringtoday), (cmd.done));

        // parseDate valid
        //var parsedValue = Date.parse(duedate);
        //if (isNaN(parsedValue)) {
        //    console.log('%s not a valid date', duedate);
        //    process.exit(1);
        //} else { console.log('%s IS a valid date', duedate); }

        //var mystatus = (isNaN(status)) ?  : 'ongoing';

        //if (cmd.all) {
        //    var options_deleteTask = {
        //        host: 'localhost',
        //        port: '3000',
        //        path: '/tasks/delete?' + MyQueryStr,
        //        method: 'POST',

        //    }
        //}

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
            method: 'POST',
        }

        options = options_deleteTask;

    });

//program
//    .command('exec <cmd>')
//    .description('run the given remote command')
//    .action(function (cmd) {
//        console.log('exec "%s"', cmd);
//    });
//program
//    .command('teardown <dir> [otherDirs...]')
//    .description('run teardown commands')
//    .action(function (dir, otherDirs) {
//        console.log('dir "%s"', dir);
//        if (otherDirs) {
//            otherDirs.forEach(function (oDir) {
//                console.log('dir "%s"', oDir);
//            });
//        }
//    });
//program
//    .command('*')
//    .description('deploy the given env')
//    .action(function (env) {
//        console.log('deploying "%s"', env);
//    });
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