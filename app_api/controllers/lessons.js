var mongoose = require('mongoose');
var Les = mongoose.model('Lesson');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

/* Ajax testing functions */
module.exports.test = function(req, res) {
  Les.find({}, function(err, allChars) {
    var display = {};
    if (req.body.input == allChars[0]['pronunciation']){
      display.display = req.body.input;
    }
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      console.log(display.display);
      sendJsonResponse(res, 200, display);
    }
  });
};

var allData = {};

module.exports.getAllAlphabet = function(req, res) {
  Les.find({}, function(err, allChars) {
    var chars = [];
    for (var i = 0; i < allChars.length; i++){
      var temp = {};
      temp['css'] = 'letters';
      temp['_id'] = allChars[i]._id;
      temp['src'] = allChars[i].src;
      temp['pronunciation'] = allChars[i].pronunciation;
      temp['name'] = allChars[i].name;
      temp['example'] = allChars[i].example;
      temp['type'] = allChars[i].type;
      chars.push(temp);
    }
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      allData.allChars = chars;
      sendJsonResponse(res, 200, chars);
    }
  });
};


module.exports.checkAnswer = function (req, res) {
  console.log(req.body.input);
  console.log(req.body.charid);
  Les.find({}, function (err, allChars){
    allData.charid = req.body.charid;
    allData.answer = req.body.input;
    allData.correctAnswer = false;
    for (var i = 0; i < allData.allChars.length; i++) {
      if (allData.allChars[i]["_id"] == allData.charid) {
        if (allData.allChars[i]["pronunciation"] == allData.answer) {
          allData.correctAnswer = true;
          allData.allChars[i]['css'] = 'correct';
        } else {
          allData.allChars[i]['css'] = 'incorrect';
        }
      }
    }
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      if (allData.correctAnswer) {
        console.log("correct");
        sendJsonResponse(res, 201, allData);
      } else {
        console.log("incorrect");
        sendJsonResponse(res, 201, allData);
      }
    }
  });
};
