const express = require("express");
var app=express();
const request = require('request');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const config = require('./config.js');
const apiKey = config.apiKey;
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.get("/results", function(req, res){
  const searchMovie=req.query.s;
  request(`http://www.omdbapi.com/?s=${searchMovie}&apikey=${apiKey}`,function (error, response, body){
    if(response.statusCode==200){
      const movieData = JSON.parse(body);
      res.render("results", {movieData: movieData, searchMovie: searchMovie});
    }
  });
});
app.post("/searchMovies", function(req, res){
  console.log(req.body.movieName);
  var searchMovie = req.body.movieName;
  res.redirect('/results?s='+searchMovie);
});

app.listen(3000, function(){
  console.log("Movie server started");
})
