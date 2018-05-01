import { log } from 'ruucm-util'

import helloFunction from './src/handlers/hello'
import detectLabelFunction from './src/handlers/detectLabel'
import detectFaceFunction from './src/handlers/detectFace'




/**
 *  Handlers
 */
export const hello = helloFunction;
export const detectLabel = detectLabelFunction;
export const detectFace = detectFaceFunction;
