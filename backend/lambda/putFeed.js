
console.log('Loading function');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    if (event.url) {
        const data = await dynamodb.putItem(
        {
            TableName: "feed",
            Item: {
                "url": {"S": event.url}
            }
        }).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        return response;
    } else {
        const response = {
            statusCode: 500,
            body: JSON.stringify(false),
        };
        return response;
    }

};
