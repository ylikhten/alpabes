var mongoose = require('mongoose');
var Les = mongoose.model('Lesson');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getAllAlphabet = function(req, res) {
  Les.find({}, function(err, allChars) {
    var chars = [];
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, allChars);
    }
  });
};


module.exports.checkAnswer = function (req, res) {
  //var charid = req.params.characterid;
  //var answer = req.body.answer;
  //var correctAnswer = false;
  Les.find({}, function (err, allChars){
    var allData = {
      charid : req.params.characterid,
      answer : req.body.answer,
      allChars : allChars,
      correctAnswer : false
    };
    //console.log(allData.allChars);
    //console.log(typeof(allData.charid));
    for (var i = 0; i < allData.allChars.length; i++) {
      if (allData.allChars[i]["_id"] == allData.charid) {
        if (allData.allChars[i]["pronunciation"] == allData.answer) {
          allData.correctAnswer = true;
        }
      }
    }
    console.log(allData.answer);
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
