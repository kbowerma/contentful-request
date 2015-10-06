// A simple hack to avoid the link resolving. This will not affect anything else.

var contentfulResolveResponsePath = './node_modules/contentful/node_modules/contentful-resolve-response';
require(contentfulResolveResponsePath);
require.cache[require.resolve(contentfulResolveResponsePath)].exports = function(obj) {
    return obj;
};

// Dependencies.

var config = require('./config.js');
var contentful = require('contentful');
var express = require('express');
var path = require('path');

// Create cliemt.

var client = contentful.createClient({
    space: config.spaceId,
    accessToken: config.accessToken
});

var app = express();
var apiRouter = new express.Router();

app.get('/', function(req, res) {
    //res.end("<a href=\"/api/posts\">/api/posts</a> \n <a href=\"/api/authors\">/api/authors<a> \n <a href=\"/api/categories\">/api/categories<a>");
     res.sendFile(path.join(__dirname+'/index.html'));
});

// Authors endpoint.

apiRouter.get('/authors', function(req, res, next) {
    client.entries({
        content_type: config.authorId
    }).then(function(data) {
        res.json(data.items);
    }).catch(next);
});

// Posts endpoint.

apiRouter.get('/posts', function(req, res, next) {
    client.entries({
        content_type: config.postId
    }).then(function(data) {
        res.json(data.items);
    }).catch(next);
});

app.use('/api', apiRouter);

// Listen.

app.listen(config.port);
