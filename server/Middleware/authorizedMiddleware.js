const jwt = require("jsonwebtoken")
const secureMiddleware = async(req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1].replace(/["']/g, '')
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken.id;
    next();
  }catch(err){
    console.log(err.message)
    res.status(401).json({message:err.message})
  }
}

module.exports = secureMiddleware;