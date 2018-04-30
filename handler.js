import ImageAnalyser from './lib/imageAnalyser'
import { save } from './lib/saveImage'
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

  let imageName = '';


  // log('event', event)

  const query = event.queryStringParameters || {};
  log('query', query)

  // log('event', event)

  log('start save Image 😀')
  if (query.url)
    imageName = save(query.url)
  else
    log('no url')

  log('imageName2', imageName)

  const data = JSON.parse(event.body);

  const s3Config = {
    bucket: 'anyfiles-for-ruucm',
    imageName: imageName,
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
