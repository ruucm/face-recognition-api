import { log } from 'ruucm-util'

import helloFunction from './src/handlers/hello'
import detectLabelFunction from './src/handlers/detectLabel'




/**
 *  Handlers
 */
export const hello = helloFunction;
export const detectLabel = detectLabelFunction;
