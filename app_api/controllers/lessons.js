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
  var charid = req.params.characterid;
  var answer = req.body.answer;

  Les.find({"_id" : charid}, function (err, correctAnswer){
    console.log(answer);
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      if (correctAnswer[0].pronunciation === answer) {
        console.log("correct");
        sendJsonResponse(res, 201, answer);
      } else {
        console.log("incorrect");
        sendJsonResponse(res, 201, -1);
      }
    }
  });
};
