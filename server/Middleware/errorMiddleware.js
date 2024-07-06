const errorMiddleware = async(err,req,res,next) =>{
  const statusCode = err.statusCode || 500
  const message = err.message || "something went wrong !"
  const extraDetails = err.extraDetails || "Backend Error !"
  res.status(statusCode).send({message,extraDetails})
}

module.exports = errorMiddleware;