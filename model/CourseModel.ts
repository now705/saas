import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {ICourseModel} from '../interfaces/ICourseModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class CourseModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                name: String,
                description: String,
                courseId: Number,
                //students: IStudentsModel[];
                total_assessments: Number,
                total_students: Number,
                owner: String
            }, {collection: 'courses'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ICourseModel>("Courses", this.schema);
    }

    //see all records in a collection
    public retrieveAllCourses(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
}
export {CourseModel};