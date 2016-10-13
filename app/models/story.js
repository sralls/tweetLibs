var mongoose = require('mongoose');

var storySchema = mongoose.Schema({

	sentence: String

});

storySchema.statics.getRandomStory = function(callback){
	var self = this;
	this.count(function(err,numStories){
		self.findOne().skip(Math.floor(Math.random() * numStories)).exec(callback);
	});
}


// create the model for users and expose it to our app
module.exports = mongoose.model('Story', storySchema);
/*"Sometimes a " + nounOne + " is " + verbOne +" in " + nounTwo + "." 

use a method to place each variable*/