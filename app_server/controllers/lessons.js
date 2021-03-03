var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};
// This needs to be set so apiOptions is correct when deploying on heroku
// Comment this out when testing production db locally
//if (process.env.NODE_ENV === 'production'){
// apiOptions.server = 'https://fathomless-ridge-97112.herokuapp.com'
//}

/*TESTING AJAX REQUESTS */
module.exports.test = function(req, res) {
  res.render('test', {
    title: 'Ajax Test page',
  });
}

module.exports.testpost = function(req, res) {
  console.log("post happened");
  console.log(req.body.input);
  //res.render('test');
  res.sendStatus(200);
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


var globalVar = {};

var renderPracticePage = function(req, res, globalVar){
	res.render('alphabet-practice', {
		title: 'Practice Hangul here', 
		menu: 'Practice', 
		characters: globalVar.allChars,	// responseBody from api! wow
    check: globalVar.check,
    charid: globalVar.charid,
    answer: globalVar.answer
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
      globalVar.allChars = body;
      globalVar.check = '';
      globalVar.charid = '';
      globalVar.answer = '';
			renderPracticePage(req, res, globalVar);	// pass body returned by the request to renderPracticePage function
		}
	);
};

module.exports.checkAnswer = function (req, res) {
  var requestOptions, path, postdata;
  globalVar.charid = req.query.charid;
  globalVar.answer = req.body.answer;

  path = "/api/practice/" + globalVar.charid;
  postdata = {
    id: globalVar.charid,
    answer: globalVar.answer
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  /*
  request(requestOptions, 
    function (err, response, body) {
      // globalVar.allChars only contains data if there was a GET
      // on the practice page first
      globalVar.allChars = body.allChars;
      if (body.correctAnswer) {
        globalVar.check = body.answer;
        renderPracticePage(req, res, globalVar);
      } else {
        globalVar.check = "-1";
        renderPracticePage(req, res, globalVar);
      } 
  });*/
}

