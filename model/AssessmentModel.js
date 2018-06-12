"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var AssessmentModel = /** @class */ (function () {
    function AssessmentModel() {
        this.createSchema();
        this.createModel();
    }
    AssessmentModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            courseId: Number,
            assessments: [{
                    description: String,
                    total_questions: Number,
                    due_date: String,
                    options: [String],
                    assessmentId: Number,
                    shared: String
                }]
        }, { collection: 'assessments' });
    };
    AssessmentModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Assessment", this.schema);
    };
    //see all records in a collection
    AssessmentModel.prototype.retrieveAllAssessments = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    AssessmentModel.prototype.retrieveAssessmentsDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    AssessmentModel.prototype.retrieveAssessmentsCount = function (response, filter) {
        var query = this.model.find(filter).select('assessments').count();
        query.exec(function (err, numberOfAssessments) {
            console.log('number of assessments: ' + numberOfAssessments);
            response.json(numberOfAssessments);
        });
    };
    return AssessmentModel;
}());
exports.AssessmentModel = AssessmentModel;
