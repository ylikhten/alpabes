var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};
// This needs to be set so apiOptions is correct when deploying on heroku
// Comment this out when testing production db locally
if (process.env.NODE_ENV === 'production'){
 apiOptions.server = 'https://fathomless-ridge-97112.herokuapp.com'
}

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
		title: 'Alpabes--Alphabet Practice',
		pageHeader: {
			title: 'Alpabes',
			strapline: 'Learn and practice foreign alphabets'
		}
	});
};



var renderLearnPage = function(req, res, body, viewName){
  // first separate each character - consonant, dbconsonant, vowel
  consonants = [];
  dbconsonants = [];
  vowels = [];

  // for each character in the body
  for (character in body){
    type = body[character].type

    if(type == "consonant"){
      consonants.push(body[character]);
    }
    else if(type == "dbconsonant"){
      dbconsonants.push(body[character]);
    }
    else{
      vowels.push(body[character]);
    }
  };
  
  // put letters in order
  function compare(a, b){
    if(a.src < b.src){
      return -1;
    }
    if(a.src > b.src){
      return 1;
    }
    return 0;
  }
  consonants.sort(compare);
  dbconsonants.sort(compare);
  vowels.sort(compare);

  // send the letters to view
  res.render(viewName, {
    title: 'Learn alpabet',    // these are the variables used in alphabet-learn.jade to display!
		menu: 'Learn',
		// characters: body,
    consonants: consonants,
    dbconsonants: dbconsonants,
    vowels: vowels
    
  });

};




/* GET 'Learn' page */
module.exports.learnHangul = function(req, res){
  var requestOptions, path;
  path = '/api/learn-hangul';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request (
    requestOptions,
    function(err, response, body){
      renderLearnPage(req, res, body, 'learn-hangul');
    }
  );
};

module.exports.learnCyrillic = function(req, res){
  var requestOptions, path;
  path = '/api/learn-cyrillic';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request (
    requestOptions,
    function(err, response, body){
      renderLearnPage(req, res, body, 'learn-cyrillic');
    }
  );
};



var globalVar = {};

function shuffle(arr) {
  var m = arr.length, t, i;

  // while there remain elements to shuffle...
  while(m) {
    // pick a remaining element...
    i = Math.floor(Math.random() * m--);
    
    // and swap it with the current element
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
 
  return arr;
}

var renderPracticePage = function(req, res, globalVar, viewPage){
  shuffle(globalVar.allChars);
	res.render(viewPage, {
		title: 'Practice alphabet', 
		menu: 'Practice', 
		characters: globalVar.allChars,	// responseBody from api! wow
    check: globalVar.check,
    charid: globalVar.charid,
    answer: globalVar.answer
	});
}

/* GET 'Practice' page */
module.exports.practiceHangul = function(req, res){
	var requestOptions, path;
	path = '/api/practice-hangul';	// set path for API request

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
			renderPracticePage(req, res, globalVar, 'practice-hangul');	// pass body returned by the request to renderPracticePage function
		}
	);
};

module.exports.practiceCyrillic = function(req, res){
	var requestOptions, path;
	path = '/api/practice-cyrillic';	// set path for API request

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
			renderPracticePage(req, res, globalVar, 'practice-cyrillic');	// pass body returned by the request to renderPracticePage function
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

