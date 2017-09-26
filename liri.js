var module = require('./keys');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitterKeys = module.twitterKeys;
var spotifyKeys = module.spotifyKeys;
var movieKey = module.movieKey;

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
callCommand();

function callCommand() {
	switch (command) {
	case "my-tweets": 
	getTweets();
	break;

	case "spotify-this-song":
	var song = userInput ? userInput : "The Sign Ace of Base";
	getSongInfo(song);
	break;

	case "movie-this":
	var movie = userInput ? userInput : "Mr.Nobody";
	getMovieInfo(movie);
	break;

	case "do-what-it-says":
	getFromRandomText();
	break;

	default:
	break;
}
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
			console.log("Album Name: " + data.tracks.items[0].album.name);
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song Name: " + data.tracks.items[0].name);
			console.log("Song Link: " + data.tracks.items[0].href);
		}
		else {
			console.log("Your search " + song + " returned no results.")
		}
	});
};

function getMovieInfo(movie) {
	request('http://www.omdbapi.com/?apikey=40e9cece&t='+ movie, function (error, response, body) {
		if (error) {
			return console.log('Error occurred: ' + error);
		}
		var movieInfo = JSON.parse(body);
		if (!movieInfo.Error) {
			console.log("Title:", movieInfo.Title);
			console.log("Year:", movieInfo.Year);
			console.log("IMDB Rating:", movieInfo.imdbRating);
			console.log("Rotten Tomatoes Rating:", movieInfo.Ratings[1].Value);
			console.log("Country Produced:", movieInfo.Country);
			console.log("Language:", movieInfo.Language);
			console.log("Plot:", movieInfo.Plot);
			console.log("Actors:", movieInfo.Actors);
		}
		else {
			console.log("Your search " + movie + " returned no results.")
		}
	});
}

function getFromRandomText() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log("Error occurred: " + err);
		}
		var commandLines = data.split("/");
		for (var i in commandLines) {
			command = commandLines[i].split(",")[0];
			userInput = commandLines[i].split(",")[1];
			callCommand();
		}
	});
};
