const chai = require("chai");
const supertest = require("supertest");
//const should = require("should");
var should = chai.should();

//const mongoose = require('mongoose');
//const Task = mongoose.model('Tasks');

const myserver = require('../server');
const server = supertest.agent(myserver);

    //client = require('../taskclient');
const expect = chai.expect;

// This agent refers to PORT where program is runninng.

//var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test", function () {

    // #1 should return home page
    it("should return all task",  function (done) {

        // list all task
        server
            .get('/tasks')
            //.get("/tasks/retrieve?taskname=hltask4")
            //.client list -a
            //.expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                //res.body.error.should.equal(false);
                //results.body.should.have.property('taskname');
                done();
            });
    });

});

//describe("Movies", function () {
//    describe("GET /movies", function () {
//        it("should return 200 OK with several movies", async function () {
//            const response = await supertest(myserver)
//                //.get("/tasks/")
//                .get("/tasks/retrieve?taskname=hltask4")
//                .expect(200)
//                //.expect("Content-Type", /json/);

//            //const movies = response.body;
//            response.status.should.equal(200);
//            //expect(movies).to.be.an("array");
//            //expect(movies).length.to.be.greaterThan(0);
//        });
//    });
//});