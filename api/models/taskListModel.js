'use strict';

//const date = require('date-and-time');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  duedate: {
    type: Date,
    default: Date.now
    //    default: date.addDays(now, 3)
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
      default: ['ongoing']
  }
});


module.exports = mongoose.model('Tasks', TaskSchema);