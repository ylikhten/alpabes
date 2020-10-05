/* GET home page */
module.exports.home = function(req, res){
	res.render('index', {
		title: 'Alpabes--Hangul Practice',
		pageHeader: {
			title: 'Alpabes',
			strapline: 'Learn and practice Hangul'
		}
	
	});
};

/* GET 'Learn' page */
module.exports.learn = function(req, res){
	res.render('alphabet-learn', {
		title: 'Learn Hangul',
		characters: [{
			name: 'Bieup',
			pronunciation: 'b/p',
			example: 'butter',
			src: 'images/Korean_Alphabet_bieup.png'
		},{
			name: 'Giyeok',
			pronunciation: 'g/k',
			example: 'duck',
			src: 'images/Korean_Alphabet_giyeok.png'
		},{
			name: 'Mieum',
			pronunciation: 'ma',
			example: 'material',
			src: 'images/Korean_Alphabet_mieum.png'
		}]	
		
	});
};

/* GET 'Practice' page */
module.exports.practice = function(req, res){
	res.render('index', {title: 'Practice Hangul here'});
};
