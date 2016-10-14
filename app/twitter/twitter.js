//Streaming Twitter API that is listening

var sendTweet = require('../utilities/twitterUtility.js').sendTweet

var Game = require('../models/game.js')
module.exports = function(stream){

	stream.on('error',function(json) {
		console.log(json);
	})

	stream.on('data',function(json) {
		var user = json.user ?  json.user.screen_name : undefined
		if (user && user !== 'mtcscohort4'){
			console.log("Tweet From", user, json.text);
			Game.getCurrentGame(user, function(error, game){
				if(game){
					handleExistingGame(user, json.text, game)
				} else {
					handleNoGame(user, json.text)
				}
			})
		}
	});

}


function removeTags(tweet){
	return tweet.split(' ')
		 .filter(word => word.charAt(0) !== '@')
		 .join(' ')
}
// '@MTCS04 Dinosaur'

function playGame(tweet, game){
	console.log(game)
	game.addWord(removeTags(tweet), function(err, game){
		if (game.isGameOver()){
			handleGameOver(game)
		} else {
			nextMove(game)
		}
	})
}

function nextMove(game){
	sendTweet({status : `@${game.player} The next thing we need from you is ${game.getCurrentPrompt()}`}, (err)=> console.log('error', err), () => console.log('savage burn!'))	
}

function handleGameOver(game){
	game.dateFinished = Date();
	game.save(function(err, game){
		sendTweet({status : `@${game.player} ${game.finalOutput()}`.substring(0, 140)}, (err)=> console.log('error', err), () => console.log('savage burn!'))	
	})
}

function handleExistingGame(user, tweet, game){
	if(containsPlay(tweet)){
		userIsConfused(user, game);
	} else {
		playGame(tweet, game)
	}
}
			
function handleNoGame(user, tweet){
	if(containsPlay(tweet)){
		startANewGame(user)
	} else {
		sendUserInstructions(user)
	}
}

function containsPlay(tweet){
	var re = /#play/;
	return re.test(tweet)
}


function startANewGame(user){
	Game.createRandomGame(user, function(error, game){
		nextMove(game)
	});
}

function userIsConfused(user, game){
	sendTweet({status : `@${user} You've already started a game! The next thing we need from you is ${game.getCurrentPrompt()}`}, (err)=> console.log('error', err), () => console.log('savage burn!'))
}

function sendUserInstructions(user){
		sendTweet({status : `@${user} If you'd like to play a word game tweet @mtcscohort4 with #play`}, (err)=> console.log('error', err), () => console.log('savage burn!'))
}