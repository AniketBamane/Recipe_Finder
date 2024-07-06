const validator = (schema) =>async (req,res,next) =>{
  try{
   const goodData =  await schema.parseAsync(req.body);
    req.body = goodData
    next();
  }catch(err){
    const error = {
      statusCode:400,
      message:err.errors[0].message,
      extraDetails:"Error while validation of credentials !"
    }
    next(error)
  }
}

module.exports = validator;