import AWS from 'aws-sdk'

AWS.config.update({region:'us-east-1'});
const rek = new AWS.Rekognition();

export default class rekDetectLabels {
  static getImageLabels(s3Config) {
    const params = {
      Image: {
        S3Object: {
          Bucket: s3Config.bucket,
          Name: s3Config.imageName,
        },
      },
      MaxLabels: 10,
      MinConfidence: 50,
    };
    console.log(`Analyzing file: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`);

    return new Promise((resolve, reject) => {
      rek.detectLabels(params, (err, data) => {
        if (err) {
          return reject(new Error(err));
        }
        console.log('Analysis labels:', data.Labels);
        return resolve(data.Labels);
      });
    });
  }
}
