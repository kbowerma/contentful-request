var config = { };

config.accessToken = process.env.ACCESS_TOKEN;
config.spaceId = process.env.SPACE_ID;
config.authorId = process.env.AUTHOR_CONTENT_TYPE_ID;
config.postId = process.env.POST_CONTENT_TYPE_ID;
config.categoryId = process.env.CATEGORY_CONTENT_TYPE_ID;

config.port = process.env.PORT || 3000

module.exports = config;
