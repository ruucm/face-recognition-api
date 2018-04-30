// 'use strict';
// import { log } from 'ruucm-util'

import fetch from 'node-fetch'
import AWS from 'aws-sdk'

// const fetch = require('node-fetch');
// const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();

export const save = (image_url) => {
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
        Key: "test-item-03.jpg",
        Body: buffer,
      }).promise()
    ))
    // .then(v => log('v', v))
    // .then(v => callback(null, v), callback);
};
