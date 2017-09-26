var module = require('./keys');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var twitterKeys = module.twitterKeys;
var spotifyKeys = module.spotifyKeys;

var twitterClient = new Twitter({
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret
});

var spotify = new Spotify({
	id: spotifyKeys.client_id,
	secret: spotifyKeys.client_secret});

var command = process.argv[2];
var userInput = process.argv[3];


switch (command) {
	case "my-tweets": 
	getTweets();
	break;

	case "spotify-this-song":
	var song = userInput ? userInput : "The Sign Ace of Base";
	getSongInfo(song);
	break;

	case "movie-this":
	break;

	case "do-what-it-says":
	break;

	default:
	break;
}


function getTweets() {
	twitterClient.get("statuses/user_timeline.json", 
		{count: 20}, function(error, tweets, response) {
			if(error) {
				console.log(error);
				throw error;
			}
			for (var i in tweets) {
				console.log("Created At:" + JSON.stringify(tweets[i].created_at));
				console.log("Text:" + JSON.stringify(tweets[i].text));
			}
		});
};

function getSongInfo(song) {
	spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		if (data.tracks.items.length > 0) {
			console.log(data.tracks.items[0].album.name);
			console.log(data.tracks.items[0].artists[0].name);
			console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].href);
		}
		else {
			console.log("Your search " + song + " returned no results.")
		}
	});
};

