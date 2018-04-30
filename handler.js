import ImageAnalyser from './lib/imageAnalyser'
import { save } from './lib/fetchImage'
import { log } from 'ruucm-util'

export const hello = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless v1.0! ${(await message({ time: 1, copy: 'Your function executed successfully!'}))}`,
    }),
  };

  callback(null, response);
};

const message = ({ time, ...rest }) => new Promise((resolve, reject) => 
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
  }, time * 1000)
);


/**
 * Image Analysis
 */
export const imageAnalysis = async (event, context, callback) => {
  log('start save Image 😀')
  save('https://avatars0.githubusercontent.com/u/29548023?s=460&v=4')
  const data = JSON.parse(event.body);

  const s3Config = {
    bucket: 'anyfiles-for-ruucm',
    imageName: 'test-item-03.jpg',
  };
  return ImageAnalyser
    .getImageLabels(s3Config)
    .then((labels) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({ Labels: labels }),
      };
      callback(null, response);
    })
    .catch((error) => {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: error.message || 'Internal server error',
      });
    });
};
