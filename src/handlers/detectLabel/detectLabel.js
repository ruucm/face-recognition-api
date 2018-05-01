import { save } from '../../services/saveImage'
import ImageAnalyser from '../../services/imageAnalyser'
/**
 *  Image Analysis
 */
const detectLabel = async (event, context, callback) => {
  // Fetch & Save Image from Url
  let imageName = '';
  const query = event.queryStringParameters || {};
  if (query.url)
    imageName = await save(query.url)
  else
    log('no url')

  // Analyse
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

export default detectLabel;
