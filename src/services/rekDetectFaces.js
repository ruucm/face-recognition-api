import AWS from 'aws-sdk'

AWS.config.update({region:'us-east-1'});
const rek = new AWS.Rekognition();

export default class rekDetectFaces {
  static getFaceDetails(s3Config) {
    const params = {
      Image: {
        S3Object: {
          Bucket: s3Config.bucket,
          Name: s3Config.imageName,
        },
      },
    };
    console.log(`Analyzing file: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`);

    return new Promise((resolve, reject) => {
      rek.detectFaces(params, (err, data) => {
        if (err) {
          return reject(new Error(err));
        }
        console.log('Analysis data:', data);
        return resolve(data);
      });
    });
  }
}
