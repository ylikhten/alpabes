var express = require('express');
var router = express.Router();
var ctrlLessons = require('../controllers/lessons');

/* Home page + Lessons pages */
router.get('/', ctrlLessons.home);
router.get('/learn-hangul', ctrlLessons.learnHangul);
router.get('/practice-hangul', ctrlLessons.practiceHangul);
router.post('/practice-hangul', ctrlLessons.checkAnswer);

router.get('/learn-cyrillic', ctrlLessons.learnCyrillic);
router.get('/practice-cyrillic', ctrlLessons.practiceCyrillic);
router.post('/practice-cyrillic', ctrlLessons.checkAnswer);


/*
router.route('/practice')
  .get(ctrlLessons.practice);
  .post(ctrlLessons.checkAnswer);
*/

/* Testing ajax request */
//router.get('/test', ctrlLessons.test)
//router.post('/test', ctrlLessons.testpost)



module.exports = router;
