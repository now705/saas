"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');
var CourseModel_1 = require("./model/CourseModel");
var AssessmentModel_1 = require("./model/AssessmentModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 100;
        this.Courses = new CourseModel_1.CourseModel();
        this.Assessments = new AssessmentModel_1.AssessmentModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger('dev'));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/app/courses/:courseId/count', function (req, res) {
            var id = req.params.courseId;
            console.log('Query single course with id: ' + id);
            _this.Assessments.retrieveAssessmentsCount(res, { courseId: id });
        });
        router.post('/app/courses/', function (req, res) {
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.courseId = _this.idGenerator;
            _this.Courses.model.create([jsonObj], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(_this.idGenerator.toString());
            _this.idGenerator++;
        });
        router.get('/app/courses/:courseId', function (req, res) {
            var id = req.params.courseId;
            console.log('Query single list with id: ' + id);
            _this.Assessments.retrieveAssessmentsDetails(res, { courseId: id });
        });
        router.get('/app/courses/', function (req, res) {
            console.log('Query All courses');
            _this.Courses.retrieveAllCourses(res);
        });
        router.get('/app/assessments/', function (req, res) {
            console.log('Query All assessments');
            _this.Assessments.retrieveAllAssessments(res);
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + 'img'));
        //this.expressApp.use('/', express.static(__dirname+'/angularDist'));
        this.expressApp.use('/', express.static(__dirname + 'pages'));
    };
    return App;
}());
exports.App = App;
