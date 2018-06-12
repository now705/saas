import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongodb from 'mongodb';
import * as url from 'url';
import * as bodyParser from 'body-parser';
//var MongoClient = require('mongodb').MongoClient;
//var Q = require('q');

import {CourseModel} from './model/CourseModel';
import {AssessmentModel} from './model/AssessmentModel';
import {DataAccess} from './DataAccess';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Courses:CourseModel;
  public Assessments:AssessmentModel;
  public idGenerator:number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.idGenerator = 100;
    this.Courses = new CourseModel();
    this.Assessments = new AssessmentModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    router.get('/app/courses/:courseId/count', (req, res) => {
        var id = req.params.courseId;
        console.log('Query single course with id: ' + id);
        this.Assessments.retrieveAssessmentsCount(res, {courseId: id});
    });

    router.post('/app/courses/', (req, res) => {
        console.log(req.body);
        var jsonObj = req.body;
        jsonObj.courseId = this.idGenerator;
        this.Courses.model.create([jsonObj], (err) => {
            if (err) {
                console.log('object creation failed');
            }
        });
        res.send(this.idGenerator.toString());
        this.idGenerator++;
    });

    router.get('/app/courses/:courseId', (req, res) => {
        var id = req.params.courseId;
        console.log('Query single list with id: ' + id);
        this.Assessments.retrieveAssessmentsDetails(res, {courseId: id});
    });

    router.get('/app/courses/', (req, res) => {
        console.log('Query All courses');
        this.Courses.retrieveAllCourses(res);
    });

    router.get('/app/assessments/', (req, res) => {
        console.log('Query All assessments');
        this.Assessments.retrieveAllAssessments(res);
    });

    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'img'));
    this.expressApp.use('/', express.static(__dirname+'/angularDist'));
    //this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};