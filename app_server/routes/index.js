var express = require('express');
var router = express.Router();
var ctrlLessons = require('../controllers/lessons');

/* Home page + Lessons pages */
router.get('/', ctrlLessons.home);
router.get('/learn', ctrlLessons.learn);
router.get('/practice', ctrlLessons.practice);
router.post('/practice', ctrlLessons.checkAnswer);
/*
router.route('/practice')
  .get(ctrlLessons.practice);
  .post(ctrlLessons.checkAnswer);
*/

/* Testing ajax request */
router.get('/test', ctrlLessons.test)
router.post('/test', ctrlLessons.testpost)



module.exports = router;
