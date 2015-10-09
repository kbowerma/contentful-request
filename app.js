var request = require('request'),
    express = require('express'),
    path    = require('path'),
    bodyParser = require('body-parser'),
    contentful = require('contentful');
    /*
    var env = require('node-env-file');
    env(__dirname + '/.env');
    */


// read config from env
var SPACE_ID = process.env.SPACE_ID3,
    ACCESS_TOKEN = process.env.ACCESS_TOKEN3,
    POST_CONTENT_TYPE_ID = process.env.POST_CONTENT_TYPE_ID,
    AUTHOR_CONTENT_TYPE_ID = process.env.AUTHOR_CONTENT_TYPE_ID,
    CATEGORY_CONTENT_TYPE_ID = process.env.CATEGORY_CONTENT_TYPE_ID,
    MANAGEMENT_TOKEN = process.env.MANAGEMENT_TOKEN;
var PORT = process.env.PORT || 3000;


// The Root API URL
var ROOT_URL = "https://cdn.contentful.com/spaces";
var ROOT_URL_API = "https://api.contentful.com/spaces";

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Create client.
var client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
});

/* default no path */
app.get("/", function(req, res) {
    //res.end("<a href=\"/api/posts\">/api/posts</a> \n <a href=\"/api/authors\">/api/authors<a> \n <a href=\"/api/categories\">/api/categories<a>");
     res.sendFile(path.join(__dirname+'/index.html'));
});

app.get("/new", function(req, res) {
    res.render("index.jade");
});

/* POST to post */
app.post("/api/new", function(req, res) {

    console.log(req.body);
    var entryid = req.body.id;
    //var entryid = 'sdfasdfasdfasdf';
    var datatosend = JSON.stringify({"fields":{"title":{"en-US":req.body.title}, "body":{"en-US":req.body.body}}});
    var options = {
    url: ROOT_URL_API + "/" + SPACE_ID + "/entries/" + entryid,
    headers: {
       "Authorization":"Bearer " + MANAGEMENT_TOKEN,
       "X-Contentful-Content-Type":POST_CONTENT_TYPE_ID,
    },

    body:datatosend
    };


    request.put(options, function(error, _responce, body){
         if(error) {
            res.status(500).end(JSON.stringify({error: error}));
        } else {
	  if(body instanceof String){
            res.status(200).end(body);
	  }else{
	    res.status(200).end(JSON.stringify(body));
	  }
        }
    });
});

/* Get to posts */
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

/* Get post using native contentful npm */
app.get('/npm/posts', function(req, res, next) {
    client.entries({
        content_type: POST_CONTENT_TYPE_ID
    }).then(function(data) {
        res.json(data);
        console.log(data);
    }).catch(next);
});

/* Get to authors */
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


/* Get to categories */
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
