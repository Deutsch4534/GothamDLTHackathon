const CryptoJS = require("crypto-js");
const Feed = require("./feed.js")


const writePhotoToStorage = (userSession, photo, callback) => {
    const fileExtension = photo.type.split('/').pop();
    console.log(fileExtension);
    
    var reader = new FileReader();

    reader.onload = function(event) {
        var binary = event.target.result;
        var md5 = CryptoJS.MD5(binary).toString();
        console.log(`${md5}.${fileExtension}`);
        userSession.putFile(`${md5}.${fileExtension}` , photo, {encrypt:false}).then((url)=>{
            Feed.writeUrlToFeed(url, (succesQuestionMark) => {
                console.log(succesQuestionMark);
            })
        })
    };

    reader.readAsBinaryString(photo);
}

module.exports.writePhotoToStorage = writePhotoToStorage;