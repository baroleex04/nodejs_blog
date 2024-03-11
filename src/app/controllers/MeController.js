const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find()
            .then(courses => 
                res.render('me/store-courses', { courses: multipleMongooseToObject(courses)})
            )
            .catch(next)
    }

    trashCourses(req, res, next) {
        Course.findWithDeleted()
            .then(courses => 
                res.render('me/trash-courses', { courses: multipleMongooseToObject(courses)})
            )
            .catch(next)
    }
}

module.exports = new MeController();
