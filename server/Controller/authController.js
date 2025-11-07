const userModel = require("../Model/userModel")
const transporter = require("../Utils/transporter")
const signUp = async(req,res)=>{
  try{
    console.log('[AUTH] SignUp attempt:', { email: req.body.email, username: req.body.username });
    const {email,username,password} = req.body;
    const user = await userModel.findOne({email})
    if(user){
      console.log('[AUTH] SignUp failed: User already exists -', email);
      return res.status(400).json({message:"user already exists"})
    }
    const newUser = new userModel({email,username,password})
    await newUser.save();
    console.log('[AUTH] SignUp successful:', email);
    res.status(201).json({message:"user created",token:newUser.generateToken()})
  }catch(e){
    console.log('[AUTH] SignUp error:', e.message);
    res.status(500).json({message:e.message})
  }
}

const signIn = async (req, res) => {
  try {
    console.log('[AUTH] SignIn attempt:', req.body.email);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log('[AUTH] SignIn failed: User not found -', email);
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('[AUTH] SignIn failed: Invalid password -', email);
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log('[AUTH] SignIn successful:', email);
    res.status(200).json({ message: "user logged in", token: user.generateToken() });
  } catch (e) {
    console.log('[AUTH] SignIn error:', e.message);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
}
// email verification before signup to check whether user is actual user or not !
const verifyEmail = async(req, res, next) => {
    try{
      const {email} = req.body;
      console.log('[AUTH] Email verification request:', email);
      const random = Math.floor(Math.random() * 9000) + 1000
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Email Verification',
        html: `
        <center>
        Please verify your email ! -<h1> your verification code is ${random} </h1>
        </center>
        `,
      };
      
      let responseSent = false;
      
      console.log('[AUTH] Sending verification email to:', email);
      const timeout = setTimeout(() => {
        if (!responseSent) {
          responseSent = true;
          console.log('[AUTH] Email sending timeout for:', email);
          return res.status(408).json({ message: 'Email sending timeout. Please try again.' });
        }
      }, 15000);
      
      transporter.sendMail(mailOptions, (error, info) => {
        clearTimeout(timeout);
        if (!responseSent) {
          responseSent = true;
          if (error) {
            console.log('[AUTH] Email sending failed:', error.message);
            return res.status(500).json({ message: 'Failed to send email. Please try again.' });
          }
          console.log('[AUTH] Email sent successfully to:', email);
          res.status(200).json({ message: ' Verification email sent',verificationCode : random})
        }
      });
    }catch(e){
      console.log('[AUTH] Email verification error:', e.message);
      res.status(500).json({message:'An error occurred. Please try again.'})
    }
  
}

module.exports = {
  signUp,
  signIn,
  verifyEmail,
}