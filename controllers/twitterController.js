var request = require('request');

var config = require('../config/config.js');
var envConfig = config.environmentConfig();

var token = {};
var twitterToken = function(req, res) {
    var response;
    var authorization = "Basic " + (new Buffer(envConfig.customerKey+":"+envConfig.customerSecret).toString('base64'));
    request.post({
        url:envConfig.tokenAPI,
        headers: {Authorization : authorization},
        form: {grant_type: 'client_credentials'}},
        function(err, httpResponse, body) {
            if(body && JSON.parse(body).access_token) {
                token.access_token = JSON.parse(body).access_token;
                response = {
                    status: 200,
                    message: "Fetched access token successfully."
                };
                res.status(200).send(response);
            } else {
                response = {
                    status: 200,
                    message: "Failed to login"
                };
                res.status(200).send(response);
            }
        })
};

var twitterProfile = function (req, res) {
    var response;
    var authorization = "Bearer " + token.access_token;
    if(!token.access_token) {
        return res.redirect('/')
    }
    var profileData = {};
    request.get({
        url:envConfig.profileAPI,
        headers: {Authorization: authorization, "Content-Type": "application/x-www-form-urlencoded"}},
    function(err, httpResponse, body){
        var body = JSON.parse(body);
        profileData.screen_name = body.screen_name;
        profileData.followers_count = body.followers_count;
        profileData.friends_count = body.friends_count;
        profileData.statuses_count = body.statuses_count;
        response = {
            status: 200,
            message: "Fetched access token successfully.",
            data: profileData
        };
        res.status(200).send(response);
    })
};

var followerList = function (req, res) {
    var response;
    var authorization = "Bearer " + token.access_token;
    if(!token.access_token) {
        return res.redirect('/')
    }
    var randomUSers = [];
    var profileData = {};
    request.get({
            url:envConfig.followerListAPI,
            headers: {Authorization: authorization, "Content-Type": "application/x-www-form-urlencoded"}},
        function(err, httpResponse, body){
            var body = JSON.parse(body).users;
            for(var i = 0; i<5; i++) {
                var index = Math.round(Math.random()*100)
                profileData = {};
                profileData.screen_name = body[index].screen_name;
                profileData.followers_count = body[index].followers_count;
                profileData.friends_count = body[index].friends_count;
                profileData.statuses_count = body[index].statuses_count;
                randomUSers.push(profileData);
            }
            response = {
                status: 200,
                message: "Fetched access token successfully.",
                data: randomUSers
            };
            res.status(200).send(response);
        })
};

module.exports.twitterToken = twitterToken;
module.exports.twitterProfile = twitterProfile;
module.exports.followerList = followerList;