var express = require('express');
var router = express.Router();
var ctrlLessons = require('../controllers/lessons');

//lessons
router.get('/learn', ctrlLessons.getAllAlphabet);
// should there be a router.get('/practice') method here :think:
//router.post('/practice', ctrlLessons.checkAnswer);
router.post('/practice/:characterid', ctrlLessons.checkAnswer);

/* Ajax testing routes */
router.post('/test', ctrlLessons.test);

module.exports = router;
