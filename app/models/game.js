var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({

	sentence: String,
	userWords: [],
	player: String,
	dateFinished: Date

});




module.exports = mongoose.model('Game', gameSchema);
