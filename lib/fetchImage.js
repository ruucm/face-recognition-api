import { log } from 'ruucm-util'
import fetch from 'node-fetch'
import AWS from 'aws-sdk'

const s3 = new AWS.S3();

export const imageSave = (image_url) => {
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
        Key: "test-item-01.jpg",
        Body: buffer,
      }).promise()
    ))
    .then(v => log('v', v))
    // .then(v => callback(null, v), callback);
};