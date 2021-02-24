var express = require('express');
var router = express.Router();
var ctrlLessons = require('../controllers/lessons');

/* Home page + Lessons pages */
router.get('/', ctrlLessons.home);
router.get('/learn', ctrlLessons.learn);
router.get('/practice', ctrlLessons.practice);
router.post('/practice/:characterid', ctrlLessons.checkAnswer);

module.exports = router;
