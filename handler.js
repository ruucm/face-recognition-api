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
  log('start Image Save 😀')
  imageSave('https://cdn.namuwikiusercontent.com/s/67552ce204c3a7be54a6b5376501d43babb21da14b6c58ead22470f769b56543856d39e62e68056dcaba89fa62862d6e02134d361aa5547f2387e7606d8ecee1c85046b46d8165fed63018a0ad14eb16?e=1533377835&k=9FVwiwYz-MRz9GdMWdOEvg')
  const data = JSON.parse(event.body);

  const s3Config = {
    bucket: 'anyfiles-for-ruucm',
    imageName: 'test-item-01.jpg',
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
