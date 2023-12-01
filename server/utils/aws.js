const path = require('path');
const AWS = require('aws-sdk');


require("dotenv").config({path: path.join(__dirname, '../../.env')});

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: 'us-east-2'
})

const s3 = new AWS.S3();

module.exports = s3;