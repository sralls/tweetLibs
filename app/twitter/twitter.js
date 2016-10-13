var sendTweet = require('../utilities/twitterUtility.js').sendTweet

module.exports = function(stream){

	stream.on('error',function(json) {
		console.log(json);
	})

	stream.on('data',function(json) {
		console.log(json);	
		if(json.user && json.user.name === 'Lyedar'){
			sendTweet({status : '@Lyedar Want to play a game'}, ()=> console.log('error'), () => console.log('savage burn!'))
		}
		
	})
}