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
      //allChars.forEach(function(doc){
      //  chars.push({
      //    name: doc.obj.name,
      //    pronunciation: doc.obj.pronunciation,
      //    example: doc.obj.example,
      //    src: doc.obj.src,
      //    _id: doc.obj._id
	//});
      //});
      // this correctly GETs the information from db
      // maybe we won't be able to use the data how we want with just this tho
      sendJsonResponse(res, 200, allChars);
      
	
    }
  });
};
