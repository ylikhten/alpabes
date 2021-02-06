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
