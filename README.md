# liri-node-app

This is a node.js app called LIRI. It is a language interpretation recognition interface program similar to SIRI. It is a command line node app that takes in specific parameters and gives you back data. 

Available parameters the application is able to take in: 

*my-tweets
*spotify-this-song
*movie-this
*do-what-it-says

Type in node liri.js into the command line in order to get the instructions on how to enter the commands correctly.

 Example for twitter

```
node liri.js my-tweets
```

* Example for spotify

```
node liri.js spotify-this-song '<song name here>'
```
* shows the following information about the song in the terminal
	1. artist(s)
	2. song name
	3. preview link of the song from spotify
	4. album that the song is a part of

* Example for movie
```
node liri.js movie-this '<movie name here>'
```
* this would output the following information to the terminal:
	1. Title
	2. Year
	3. IMDB Rating
	4. Country
	5. Language
	6. Plot
	7. Actors
	8. Rotten Tomatoes Rating
	9. Rotten Tomatoes URL


* Example for do what it says
```
node liri.js do-what-it-says
```


* These are the npm packages used and are needed to run the app
	1. fs package in node
	2. [twitter](https://www.npmjs.com/package/twitter)
	3. [spotify](https://www.npmjs.com/package/spotify)
	4. [request](https://www.npmjs.com/package/request)

* to install these npm packages run these commands one at a time.
```
npm install twitter
npm install spotify
npm install request
```
