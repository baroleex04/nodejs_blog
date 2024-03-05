const Course = require('../models/Course');

async function showCourse(req, res) {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch(error) {
        res.status(400).json({ error: 'ERROR!!!'});
    }
}

class SiteController {
    // [GET] /
    index(req, res) {
        showCourse(req, res);
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
