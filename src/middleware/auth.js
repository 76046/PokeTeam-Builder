import basicAuth from '../utils/basicAuth'
import tokenAuth from '../utils/tokenAuth'

const combinedAuth = async (req, res, next) => {
    if (basicAuth || tokenAuth) {
      return res.send('authorization correct')
    }
    return res.send('authorization invalid')
  }
  
  export default combinedAuth