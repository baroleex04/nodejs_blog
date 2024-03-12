const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}), 
            Course.findDeleted({ 'deleted': {$exists: true}}, {'deleted': true}).then(deletedCourses => deletedCourses.length)
        ])
            .then(([courses, deleteCount]) => 
                res.render('me/store-courses', { 
                    deleteCount,
                    courses: multipleMongooseToObject(courses)
                })
            )
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => 
                res.render('me/trash-courses', { courses: multipleMongooseToObject(courses)})
            )
            .catch(next)
    }
}

module.exports = new MeController();
