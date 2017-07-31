//External dependencies
var express = require('express');
var router = express.Router();

// Internal dependencies
var twitterController = require('../controllers/twitterController.js');

router.get('/twitter/token', twitterController.twitterToken);
router.get('/twitter/profile', twitterController.twitterProfile);
router.get('/follower/list', twitterController.followerList);
//exports
module.exports = router;