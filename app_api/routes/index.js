var express = require('express');
var router = express.Router();
var ctrlLessons = require('../controllers/lessons');

//lessons
router.get('/learn', ctrlLessons.getAllAlphabet);

module.exports = router;
