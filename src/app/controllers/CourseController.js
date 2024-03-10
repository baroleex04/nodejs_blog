const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => 
                res.render('courses/show', { course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => 
                res.render('courses/edit', { course: mongooseToObject(course)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [POST] /courses/STORE
    async store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        await course.save()
            .then(res.redirect('/'))
            .catch(error => {
                
            })
    }
}

// GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD

module.exports = new CourseController();
