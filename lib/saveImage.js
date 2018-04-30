import fetch from 'node-fetch'
import AWS from 'aws-sdk'
import { log } from 'ruucm-util'

const s3 = new AWS.S3();

export const save = (image_url) => {
  let uniqueKey = Date.now();
  let imageName = "test-item-" + uniqueKey + ".jpg";
  log('imageName', imageName)
  fetch(image_url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(
            `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(buffer => (
      s3.putObject({
        Bucket: 'anyfiles-for-ruucm',
        Key: imageName,
        Body: buffer,
      }).promise()
    ))
    // .then(v => log('v', v))
    // .then(v => callback(null, v), callback);
  return imageName;
};
