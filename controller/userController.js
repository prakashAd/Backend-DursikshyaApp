const User = require('../model/userModel')
const Token = require('../model/tokenModel')
const crypto = require("crypto")
const sendEmail = require('../Utils/setEmails')

//register new user

exports.register = async (req, res) => {
    const { username, email, password } = req.body;   //destructuring
  
    //check if email already registered
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "Email  address already registered,please choose another email" });
    }
  
    let newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    // Ta add user to database
    newUser = await newUser.save();
    if (!newUser) {
      return res.status(400).json({ error: "something went wrong" });
    }
  res.send(newUser)


  //to generate token
  let token = new Token({
    token: crypto.randomBytes(24).toString("hex"), //generates hex string of 24 bytes
    user: newUser._id,
  });
  token = await token.save();

  if (!token) {
    return res.status(400).json({ error: "Failed to generate Token" });
  }

  //send token in email

  const url = `http://localhost:5000/api/verifyEmail/${token.token}`;

  sendEmail({
    from: "noreply@express.com.np",
    to: newUser.email,
    subject: "Verification email",
    text: `Click to the following link or copy  paste it in brower to veryfy your mail.
            .${url}`,
    html: `<a href ="${url}"><button>Verify Email</button></a>`,
  })
}

  // to verify email

  exports.verifyEmail = async (req,res)=>{

    //check token
    const token = await Token.findOne({ token: req.params.token})

    if(!token){
      return res.status(400).json({error:"Invalid token may have expired"})
    }

  }