'use strict';

var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');
const winston = require("winston");

// logger : error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
const logger = winston.createLogger({
    level: 'info', 
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logfile.log" })
    ]
});


exports.list_all_tasks = function (req, res) {
    logger.info('.list_all_tasks');
    Task.find({}, function(err, task) {
      if (err) {
          res.send(err);
      }
    res.json(task);
  });
};


exports.create_a_task = function(req, res) {
    logger.info('create_a_task');

    var MyTaskDueDate;
    if (!req.query.duedate) {
        MyTaskDueDate = new Date(); 
    }else {
        MyTaskDueDate = Date.parse(req.query.duedate);
    }
    //var new_task = new Task({ name: req.query.taskname, duedate: Date.parse(req.query.DueDate) });
    var new_task = new Task({ name: req.query.taskname, duedate: MyTaskDueDate});

    //console.log(req.body);
    logger.info(req);

  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

    logger.info(new_task);
};

exports.read_a_task_id = function (req, res) {
    logger.info('read_a_task_id');
    //if (!req.params.taskId) {
        Task.findById(req.params.taskId, function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    //}

  
};

exports.read_many_task = function (req, res) {
    logger.info('read_many_task');
    // req.query.taskname/ req.query.duedate / req.query.taskId/status

    if (req.query.taskname) {
        Task.find({ name: req.query.taskname },
            function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
    }
    else if (req.query.duedate) {
        // parseDate valid
        var parsedValue = Date.parse(req.query.duedate);
        logger.debug('%d', parsedValue);

        if (isNaN(parsedValue)) {
            logger.debug('%s not a valid date', parsedValue);
            res.send(err);
        } else {
            logger.debug('%s IS a valid date', parsedValue);

            // find greater than the duedate
            Task.find({
                duedate: { $gt: req.query.duedate }
            },
                function (err, task) {
                    if (err)
                        res.send(err);
                    res.json(task);
                });
        }
    } else if (req.query.status) {
        Task.find({ status: req.query.status },
            function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
    }
    else { res.send(err);}
};

exports.update_a_task = function (req, res) {
    logger.info('update_a_task');
    var MyTaskDueDate;
    if (!req.query.duedate) {
        MyTaskDueDate = new Date();
    } else {
        MyTaskDueDate = Date.parse(req.query.duedate);
    }

    //console.log(req.body);
    logger.info(req);

    //TBC: req.query.duedate / req.query.taskId/status
    //Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function(err, task) {
    //Task.findOneAndUpdate({ name: req.params.taskname }, req.body, { new: true },
    Task.findOneAndUpdate({ name: req.params.taskname },
        { status: req.query.status},
        { new: true },
        function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function(req, res) {
    logger.info('delete_a_task');
    Task.remove(
        //{ _id: req.params.taskId },
        { name: req.query.taskname },
        function (err, task) {
      if (err) {
          res.send(err);
      }
      else {
          logger.info("Result :", task)
          res.json({ message: 'Task successfully deleted' });
      }
    
  });
};
