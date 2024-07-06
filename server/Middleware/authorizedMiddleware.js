const jwt = require("jsonwebtoken")
const secureMiddleware = async(req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  }catch(err){
    res.status(401).json({message:err.message})
  }
}

module.exports = secureMiddleware;