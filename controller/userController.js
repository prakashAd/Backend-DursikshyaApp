const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../Utils/setEmails");
const jwt = require("jsonwebtoken");
const {expressjwt} = require("express-jwt");

//register new user

exports.register = async (req, res) => {
  const { username, email, password,coursecompleted,yeargraduated,gender } = req.body; //destructuring

  //check if email already registered
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(400)
      .json({
        error: "Email  address already registered,please choose another email",
      });
  }

  let newUser = new User({
    username: username,
    email: email,
    password: password,
    coursecompleted: coursecompleted,
    yeargraduated: yeargraduated
  });

  // Ta add user to database
  newUser = await newUser.save();
  if (!newUser) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send(newUser);

  //to generate token
  let token = new Token({
    token: crypto.randomBytes(24).toString("hex"), //generates hex string of 24 bytes
    user: newUser._id,
  });
  token = await token.save(); //to save token in database

  if (!token) {
    return res.status(400).json({ error: "Failed to generate Token" });
  }

  //send token in email

  // const url = `http://localhost:5000/api/verifyemail/${token.token}`;
  const url = `${process.env.FRONTEND_URL}/verifyemail/${token.token}`;

  sendEmail({
    from: "noreply@express.com.np",
    to: newUser.email,
    subject: "Verification email",
    text: `Click to the following link or copy  paste it in brower to veryfy your mail.
            .${url}`,
    html: `<a href ="${url}"><button>Verify Email</button></a>`,
  });
};

// to verify email

exports.verifyEmail = async (req, res) => {
  // to check token id generated or not
  const token = await Token.findOne({ token: req.params.token });

  if (!token) {
    return res.status(400).json({ error: "Invalid token may have expired" });
  }

  //to find user

  let user = await User.findById(token.user);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  //to check if user is already verified or not

  if (user.isVerified) {
    return res
      .status(400)
      .json({ error: "user alredy verified.login to continue" });
  }

  //verify user

  user.isVerified = true;
  user = await user.save();

  if (!user) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send({ message: "User  is verified Succesfully" });
};

//to resend verification email

exports.resendVerification = async (req, res) => {
  // check if email is registered or not
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: "Email address is  not registered" });
  }

  //check if already verified

  if (user.isVerified) {
    return res.status(400).json({ error: "Email /User already verified" });
  }
  //generate token

  let token = new Token({
    token: crypto.randomBytes(24).toString("hex"), //generates hex string of 24 bytes
    user: user._id,
  });
  token = await token.save();

  if (!token) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  //send token in email

  const url = `http://localhost:5000/api/verifyemail/${token.token}`;

  sendEmail({
    from: "noreply@noreply.com.np",
    to: user.email,
    subject: "Verification email",
    text: `Click to the following link or copy  paste it in browser to verify your mail.
        .${url}`,
    html: `<a href ="${url}"><button>Verify Your Email</button></a>`,
  });

  res.send({ message: "Verification Link has been sent to your email." });
};

//forget password

exports.forgetPassword = async (req, res) => {
  //check mail
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Email is not registerd" });
  }

  //generate token

  let token = new Token({
    token: crypto.randomBytes(24).toString("hex"), //generates hex string of 24 bytes
    user: user._id,
  });
  token = await token.save();

  if (!token) {
    return res.status(400).json({ error: "Failed to generate Token" });
  }

  //send email

  const url = `http://localhost:5000/api/resetpassword/${token.token}`;
  sendEmail({
    from: "noreply@noreply.com.np",
    to: user.email,
    subject: "password reset email",
    text: " Please Click to link to reset password",
    html: `<a href="${url}"><button>Reset password</button></a>`,
  });

  return res.send({
    message: "Password reset link has been sent to your email",
  });
};

//to reset password

exports.resetPassword = async (req, res) => {
  const token = await Token.findOne({ token: req.params.token });

  if (!token) {
    return res
      .status(400)
      .json({ error: "Invalid token or token may have expired" });
  }
  //find user

  let user = await User.findById(token.user);
  if (!user) {
    return res.status(400).json({ error: "something went wrong" });
  }
  user.password = req.body.password;

  user = await user.save();

  if (!user) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send({ message: "password reset succesfully" });
};

// to get user lists

exports.getUserList = async (req, res) => {
  let users = await User.find().select(["username", "email"]);
  if (!users) {
    return res.status(400).json({ error: "Cannot Find the user list" });
  }
  res.send(users);
};

//to view user details

exports.userDetails = async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return res.status(400).json({ error: "Unable to find the user Details" });
  }
  res.send(user);
};

// //to view user details by username
// exports.userDetails1 = async (req, res) => {
//   let users = await User.find({ username: req.body.username });

//   if (!users) {
//     return res.status(400).json({ error: "Unable to find the user Details" });
//   }
//   res.send(users);
// };

//to update  user

exports.updateUser = async (req, res) => {
  let userToUpdate = await User.findByIdAndUpdate(
    req.params.id,

    {
      user_username: req.body.user_name,
      user_email: req.body.user_email,
      isVerified: req.body.isVerified,
      role: req.body.role,
    },
    { new: true }
  );

  if (!userToUpdate) {
    return res.status(400).json({ error: "Unable to update user information" });
  }

  res.send(userToUpdate);
};

exports.deleteAll = async (req, res) => {
  try {
    await User.remove({});
    res.status(200).send("All users are deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting users");
  }
};

// for signin 

exports.signIn = async (req, res) => {
  let { email, password } = req.body;
  //to check email
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  // to check password

  if (!user.authenticate(password)) {
    return res.status(400).json({ error: "Email and password do not matched" });
  }

  //check if verified or not

  //check if verified

  if (!user.isVerified) {
    return res.status(400).json({ error: "User not verified" });
  }
  //create sign in in token

  let token = jwt.sign(
    { user: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  //set cookies
  res.cookie("mycookie", token, { expire: Date.now() + 86400 });

  // to return info to frontend
  let { _id, username, role } = user;

  res.send({ token, user: { _id, username, email, role } });
};

//for signing out
exports.signOut =async (req,res)=>{
    await res.clearCookie('mycookie')
    res.send({message:"Sign out successfully"})
  }

  //for authorizaton

  exports.requireSignin = expressjwt({
    algorithms:["HS256"],
    secret: process.env.JWT_SECRET
  })
  