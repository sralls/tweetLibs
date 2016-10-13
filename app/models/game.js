var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({

	sentence: String,
	userWords: [],
	player: String,
	dateFinished: Date

});


//https://github.com/aivis/user-stream/blob/master/README.md installed
//https://github.com/BoyCook/TwitterJSClient installed

//create method to pull our escaped words from sentence.//
//make another method to take the input of userwords and return the full sentence.//
//use date finished to display games on renderedLibs.//
//how does the schema know what sentence is from story.//

module.exports = mongoose.model('Game', gameSchema);
