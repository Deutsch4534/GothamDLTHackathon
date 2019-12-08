//helper lib to interact with feed
const axios = require('axios');

const feedApiUrl = 'https://itk6d69p5b.execute-api.us-east-2.amazonaws.com/prod/feed';

//returns data or false
const getFeed = (callback) => {
    axios.get(feedApiUrl).then((response) => {
        if (response.status == '200') {
            callback(response.data.body);
        } else {
            console.log(JSON.stringify(response));
            callback(false);
        }
    })
    .catch((error) => {
        console.log(JSON.stringify(response));
        callback(false);
    })
}

// returns true or false
const writeUrlToFeed = (url, callback) => {
    if(validURL(url)) {
        axios.put(feedApiUrl,{url: url}).then((response) => {
            if (response.status == '200') {
                callback(true);
            } else {
                console.log(JSON.stringify(response));
                callback(false);
            }
        })
        .catch((error) => {
            console.log(error);
            callback(false);
        })
    } else {
        console.log(JSON.stringify(response));
        callback(false);
    }
}

const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

module.exports.getFeed = getFeed;
module.exports.writeUrlToFeed = writeUrlToFeed;