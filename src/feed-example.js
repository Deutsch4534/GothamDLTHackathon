const feed = require('./lib/feed');

//change this url to play with it will probably already be in dynamo
feed.writeUrlToFeed('https://test55.com',(successQuestionMark) => {
    console.log(successQuestionMark);
});

feed.getFeed((data) => {
    console.log(data);
});
