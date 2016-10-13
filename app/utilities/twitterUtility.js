var config = require("../../data/twitter_config.js")
var Twitter = require('twitter-node-client').Twitter;

function sendTweet(parameters,error,success){
	var twitter = new Twitter(config);
	twitter.postTweet(parameters, error, success);
}




module.exports = {sendTweet};