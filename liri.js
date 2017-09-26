var twitterKeys = require('./keys');
var Twitter = require("twitter");
console.log(twitterKeys);

var twitterClient = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});
console.log(twitterClient); 

var command = process.argv[2];
var userInput = process.argv[3];


switch (command) {
	case "my-tweets": 
	getTweets();
	break;

	case "spotify-this-song":
	// getSongInfo();
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

// function getSongInfo(song) {
// 	console.log(artist, song name, link, album);
// }


