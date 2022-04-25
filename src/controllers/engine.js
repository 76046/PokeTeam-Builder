import {processing} from '../engine/processing/processing.js'


export const getProcessing = (req, res) => {
    processing();
    return res.status(418).end("Jest w pyte");
  };
  
  export const getRule = (req, res) => {
    return res.status(418).end("Jest w pyte");
  };