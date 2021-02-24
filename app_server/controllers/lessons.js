var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};
// This needs to be set so apiOptions is correct when deploying on heroku
// Comment this out when testing production db locally
if (process.env.NODE_ENV === 'production'){
 apiOptions.server = 'https://fathomless-ridge-97112.herokuapp.com'
}

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

var renderPracticePage = function(req, res, responseBody){
	res.render('alphabet-practice', {
		title: 'Practice Hangul here', 
		menu: 'Practice', 
		characters: responseBody	// responseBody from api! wow
	});
}

/* GET 'Practice' page */
module.exports.practice = function(req, res){
	var requestOptions, path;
	path = '/api/learn';	// set path for API request

	//set reuqestion options
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
	};
	// make request, sending through request options
	request(
		requestOptions,
		// supplying callback to render homepage
		function(err, response, body) {
			renderPracticePage(req, res, body);	// pass body returned by the request to renderPracticePage function
		}
	);
};

module.exports.checkAnswer = function (req, res) {
  var requestOptions, path, characterid, postdata;
  characterid = req.params.characterid;
  path = "/api/practice/" + characterid;
  postdata = {
    id: characterid,
    answer: req.body.answer
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  request(requestOptions, 
    function (err, response, body) {
      if (response.body === -1) {
        res.redirect('/practice')
        console.log(body);
      } else {
        res.redirect('/practice');
      }
      
  });
}
