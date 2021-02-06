var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};
// This needs to be set so apiOptions is correct when deploying on heroku
// Comment this out when testing production db locally
//if (process.env.NODE_ENV === 'production'){
//  apiOptions.server = 'https://fathomless-ridge-97112.herokuapp.com'
//}

/* GET home page */
module.exports.home = function(req, res){
	res.render('introduction-page', {
		title: 'Alpabes--Hangul Practice',
		pageHeader: {
			title: 'Alpabes',
			strapline: 'Learn and practice Hangul'
		}
	});
};

var renderLearnPage = function(req, res, body){
  res.render('alphabet-learn', {
    title: 'Learn Hangul',
		menu: 'Learn',
		characters: body
  });
};

/* GET 'Learn' page */
module.exports.learn = function(req, res){
  var requestOptions, path;
  path = '/api/learn';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request (
    requestOptions,
    function(err, response, body){
      renderLearnPage(req, res, body);
    }
  );
};

/* GET 'Practice' page */
module.exports.practice = function(req, res){
	res.render('alphabet-practice', {title: 'Practice Hangul here', menu: 'Practice', 
	characters: [{
			name: 'Giyeok',
			pronunciation: 'g/k',
			example: 'duck',
			src: 'images/Korean_Alphabet_giyeok.png'
		},{
			name: 'Nieun',
			pronunciation: 'n',
			example: 'neither',
			src: 'images/Korean_Alphabet_nieun.png'
		},{
			name: 'Digeut',
			pronunciation: 'd',
			example: 'dot',
			src: 'images/Korean_Alphabet_digeut.png'
		},{
			name: 'Rieul',
			pronunciation: 'r/l',
			example: 'real',
			src: 'images/Korean_Alphabet_rieul.png'
		},{
			name: 'Mieum',
			pronunciation: 'ma',
			example: 'material',
			src: 'images/Korean_Alphabet_mieum.png'
		},{
			name: 'Bieup',
			pronunciation: 'b/p',
			example: 'butter',
			src: 'images/Korean_Alphabet_bieup.png'
		}]	});
};
