var request = require('request'),
    express = require('express');


// read config from env
var SPACE_ID = process.env.SPACE_ID,
    ACCESS_TOKEN = process.env.ACCESS_TOKEN,
    POST_CONTENT_TYPE_ID = process.env.POST_CONTENT_TYPE_ID,
    AUTHOR_CONTENT_TYPE_ID = process.env.AUTHOR_CONTENT_TYPE_ID,
    CATEGORY_CONTENT_TYPE_ID = process.env.CATEGORY_CONTENT_TYPE_ID;
var PORT = process.env.PORT || 3000;

// The Root API URL
var ROOT_URL = "https://cdn.contentful.com/spaces";

var app = express();

app.get("/", function(req, res) {
    res.end("Check out /api/posts and /api/authors! \n this is the staging branch");
});

app.get("/api/posts", function(req, res) {
    request.get(ROOT_URL + "/" + SPACE_ID + "/entries", {
        qs: {
            access_token: ACCESS_TOKEN,
            content_type: POST_CONTENT_TYPE_ID
        }
    }, function(error, _response, body) {
        if(error) {
            res.status(500).end(JSON.stringify({error: error}));
        } else {
            res.status(200).end(body);
        }
    });
});

app.get("/api/authors", function(req, res) {
    request.get(ROOT_URL + "/" + SPACE_ID + "/entries", {
        qs: {
            access_token: ACCESS_TOKEN,
            content_type: AUTHOR_CONTENT_TYPE_ID
        }
    }, function(error, _response, body) {
        if(error) {
            res.status(500).end(JSON.stringify({error: error}));
        } else {
            res.status(200).end(body);
        }
    });
});



app.get("/api/categories", function(req, res) {
    request.get(ROOT_URL + "/" + SPACE_ID + "/entries", {
        qs: {
            access_token: ACCESS_TOKEN,
            content_type: CATEGORY_CONTENT_TYPE_ID
        }
    }, function(error, _response, body) {
        if(error) {
            res.status(500).end(JSON.stringify({error: error}));
        } else {
            res.status(200).end(body);
        }
    });
});



app.listen(PORT, function() {
    console.log('App listening at http://localhost:%s', PORT);
});
