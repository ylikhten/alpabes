var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.lessonLearn = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
