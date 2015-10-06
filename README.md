This is an attempt to complete the challenge using the contentful npm module. It uses a very slight
workaround that involves essentially nulling the function that resolves links:

var contentfulResolveResponsePath = './node_modules/contentful/node_modules/contentful-resolve-response';
require(contentfulResolveResponsePath);
require.cache[require.resolve(contentfulResolveResponsePath)].exports = function(obj) {
    return obj;
};

After having looked through the module, this is the only way to use it without circular references,
other than forking it and making a conditional statement to avoid the resolving of links.

This will make the request look identical as if you used the API request through the browser. I understand
this may not be accepted as "getting it to work", but I figured I would try it anyways.

Links for heroku are:

https://serene-lowlands-7387.herokuapp.com/api/authors
https://serene-lowlands-7387.herokuapp.com/api/posts