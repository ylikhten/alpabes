/* GET home page */
module.exports.home = function(req, res){
	res.render('index', {title: 'Alpabes Home'});
};

/* GET 'Learn' page */
module.exports.learn = function(req, res){
	res.render('alphabet-list', {title: 'Learn Hangul'});
};

/* GET 'Practice' page */
module.exports.practice = function(req, res){
	res.render('index', {title: 'Practice Hangul here'});
};
