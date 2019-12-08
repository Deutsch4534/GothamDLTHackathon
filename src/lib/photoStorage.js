const CryptoJS = require("crypto-js");
const Feed = require("./feed.js")


const writePhotoToStorage = (userSession, photo, callback) => {
    var reader = new FileReader();

    reader.onload = function(event) {
        var binary = event.target.result;
        var md5 = CryptoJS.MD5(binary).toString();

        userSession.putFile(md5, photo, {encrypt:false}).then(()=>{
            userSession.getFileUrl(md5).then((url)=>{
                Feed.writeUrlToFeed(url, (succesQuestionMark) => {
                    console.log(succesQuestionMark);
                })
            })
        })
    };

    reader.readAsBinaryString(photo);
}

module.exports.writePhotoToStorage = writePhotoToStorage;