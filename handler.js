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

  const query = event.queryStringParameters || {};
  log('query', query)
  log('start save Image 😀')
  if (query.url) {
    imageName = await save(query.url)
    log('End save Image 🖼')
    log('imageName2', imageName)
    log(imageName)

    const s3Config = {
      bucket: 'anyfiles-for-ruucm',
      imageName: imageName,
    };
    log('return ImageAnalyser')
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
  }
  else
    log('no url')
};
