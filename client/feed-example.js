const feed = require('./lib/feed');

feed.getFeed((data) => {
    console.log(data);
});

feed.writeUrlToFeed('https://test24.com',(successQuestionMark) => {
    console.log(successQuestionMark);
});