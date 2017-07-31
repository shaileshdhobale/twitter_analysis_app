var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

var config = require('./config/config.js');
var envConfig = config.environmentConfig();
var app = express();

var twitterRoutes = require('./routes/twitterRoutes.js');
app.use(express.static(__dirname + '/public'));

app.all('/*', twitterRoutes);

app.listen(3000);
console.log("Twitter app running on: 3000 port.")
