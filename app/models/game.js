var mongoose = require('mongoose');
var Story = require('./story.js');


var PROMPTS = /\{\{([^\{\}]*)\}\}/
var PROMPTS_G = /\{\{([^\{\}]*)\}\}/g


var gameSchema = mongoose.Schema({

	sentence: String,
	userWords: [],
	player: String,
	dateFinished: Date

});

gameSchema.statics.createRandomGame = function(username, callback) {
	var self = this;
	Story.getRandomStory(function(error, story) {
		
		if (error) {
			callback(error);
		} else {
			var newGame = new self({player:username, userWords:[], sentence:story.sentence});
			newGame.save(callback);
		}
	}) 
}

gameSchema.statics.getCurrentGame = function(username, callback) {
	this.findOne({player:username, dateFinished: { $exists: false }}, callback);
}

gameSchema.methods.getCurrentPrompt = function() {
	return getPrompts(this.sentence).slice(this.userWords.length)[0]
}

gameSchema.methods.isGameOver = function() {
	return !(PROMPTS).test(fillIn(this.sentence, this.userWords))
}

gameSchema.methods.addWord = function(word, callback) {
	this.userWords.push(word);
	this.save(callback);
}

gameSchema.methods.finalOutput = function(){
	return fillIn(this.sentence, this.userWords)
}

function getPrompts(str){
	return str.match(PROMPTS_G)
              .map(word => word.match(PROMPTS)[1]);
}

function fillIn(str, arr){
	return arr.reduce((story, word) => story.replace(PROMPTS, word), str)
}


//https://github.com/aivis/user-stream/blob/master/README.md installed
//https://github.com/BoyCook/TwitterJSClient installed

//create method to pull our escaped words from sentence.//
//make another method to take the input of userwords and return the full sentence.//
//use date finished to display games on renderedLibs.//
//how does the schema know what sentence is from story.//

module.exports = mongoose.model('Game', gameSchema);
