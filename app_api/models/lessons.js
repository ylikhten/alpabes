var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({
	name: String,
	pronunciation: String,
	example: String,
	src: String
});

mongoose.model('Lesson', lessonSchema);


