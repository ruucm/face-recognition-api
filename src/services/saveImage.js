import fetch from 'node-fetch'
import AWS from 'aws-sdk'
import { log } from 'ruucm-util'

const s3 = new AWS.S3();

export const save = (image_url) => {
  let uniqueKey = Date.now();
  let imageName = "test-item-" + uniqueKey + ".jpg";
  log('imageName', imageName)
  return new Promise((resolve, reject) => {
    fetch(image_url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(
            `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(buffer => {
      s3.putObject({
        Bucket: 'anyfiles-for-ruucm',
        Key: imageName,
        Body: buffer,
      }, (err, data) => {
          if (err) log('err', err.stack); // an error occurred
          else { 
            log('sucess!!!', data);  // successful response
            resolve(imageName);
          }
      }).promise()
    })
  });
};
