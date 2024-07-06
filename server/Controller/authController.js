const userModel = require("../Model/userModel")
const transporter = require("../Utils/transporter")
const signUp = async(req,res)=>{
  try{
    const {email,username,password} = req.body;
    const user = await userModel.findOne({email})
    if(user){
      return res.status(400).json({message:"user already exists"})
    }
    const newUser = new userModel({email,username,password})
    await newUser.save();
    res.status(201).json({message:"user created",token:newUser.generateToken()})
  }catch(e){
    res.status(500).json({message:e.message})
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }
    res.status(200).json({ message: "user logged in", token: user.generateToken() });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
// email verification before signup to check whether user is actual user or not !
const verifyEmail = async(req, res, next) => {
    try{
      const {email} = req.body;
      const random = Math.floor(Math.random() * 900000) + 100000
      const mailOptions = {
        from: 'aniketbamane696@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `
        <center>
        Please verify your email ! -<h1> your verification code is ${random} </h1>
        </center>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }       
        res.status(200).json({ message: ' Verification email sent',verificationCode : random})
      });
    }catch(e){
      res.status(500).json({message:e.message})
    }
  
}

module.exports = {
  signUp,
  signIn,
  verifyEmail,
}