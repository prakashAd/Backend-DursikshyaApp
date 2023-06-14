// const Alumni = require('../model/alumniModel')
// const Token = require('../model/tokenModel')
// const crypto = require('crypto')
// const sendEmail = require('../Utils/setEmails')
// const jwt = require('jsonwebtoken')
// const {expressjwt} =require('express-jwt')


// exports.register = async (req, res) => {
//     const { username, email, password,coursecompletd,yeargraduated } = req.body;   //destructuring
  
//     //check if email already registered
//     const alumni = await Alumni.findOne({ email:email });
//     if (alumni) {
//       return res.status(400).json({ error: "Email  address already registered,please choose another email" });
//     }
//     let newAlumni = new Alumni({
//       username: username,
//       email: email,
//       password: password,
//       coursecompleted:coursecompletd,
//       yeargraduated:yeargraduated,
//     });
// // Ta add alumni to database
// newAlumni = await newAlumni.save();
// if (!newAlumni) {
//   return res.status(400).json({ error: "something went wrong" });
// }
// res.send(newAlumni)


//   //to generate token
//   let token = new Token({
//     token: crypto.randomBytes(24).toString("hex"), //generates hex string of 24 bytes
//     alumni: newAlumni._id
//   });
//   token = await token.save(); //to save token in database

//   if (!token) {
//     return res.status(400).json({ error: "Failed to generate Token" });
//   }

//   //send token in email

//   const url = `http://localhost:5000/api/verifyemail/${token.token}`;

//   sendEmail({
//     from: "noreply@dursikshya.com.np",
//     to: newAlumni.email,
//     subject: "Verification email",
//     text: `Click to the following link or copy  paste it in brower to veryfy your mail.
//             .${url}`,
//     html: `<a href ="${url}"><button>Verify Email</button></a>`,
//   })
// }

//   // to verify email

//   exports.verifyEmail = async (req,res)=>{

//     // to check token id generated or not
//         const token = await Token.findOne({ token: req.params.token})

//     if(!token){
//       return res.status(400).json({error:"Invalid token may have expired"})
//     }

//     //to find Alumni

//   let alumni = await alumni.findById(token.alumni);
//   if (!alumni) {
//     return res.status(400).json({ error: "Alumni is not found" });
//   }


//   //to check if alumni is already verified or not

//   if (alumni.isVerified) {
//     return res
//       .status(400)
//       .json({ error: "Alumni is alredy verified." });
//   }
  
//   //verify Alumni

//   alumni.isVerified = true;
//   alumni = await alumni.save();

//   if (!alumni) {
//     return res.status(400).json({ error: "something went wrong" });
//   }
//   res.send({ message: "Alumni  is verified Succesfully" });
// };

// //to resend verification email

// exports.resendVerification = async (req, res) => {

//     // check if email is registered or not
//     let alumni = await Alumni.findOne({ email: req.body.email })
  
//     if (!alumni) {
//       return res.status(400).json({ error: "Email address is  not registered" })
//     }
  
//     //check if already verified
  
//     if (alumni.isVerified) {
//       return res.status(400).json({ error: "Email /user already verified" })
//     }
//     //generate token
  
//     let token = new Token({
//       token: crypto.randomBytes(24).toString("hex"), //generates hex string of 24 bytes
//       alumni: alumni._id
//     });
//     token = await token.save()
  
//     if (!token) {
//       return res.status(400).json({ error: "Something went wrong" })
//     }
  
  
//     //send token in email
  
//     const url = `http://localhost:5000/api/verifyemail/${token.token}`;
  
//     sendEmail({
//       from: "noreply@noreply.com.np",
//       to: alumni.email,
//       subject: "Verification email",
//       text: `Click to the following link or copy  paste it in browser to verify your mail.
//           .${url}`,
//       html: `<a href ="${url}"><button>Verify Your Email</button></a>`,
//     });
  
//     res.send({ message: "Verification Link has been sent to your email." });
//   };
  
  
// //forget password

// exports.forgetPassword = async (req, res) => {
//     //check mail
//     const alumni = await Alumni.findOne({ email: req.body.email });
//     if (!alumni) {
//       return res.status(400).json({ error: "Email is not registerd" });
//     }
  
//     //generate token
  
//     let token = new Token({
//       token: crypto.randomBytes(24).toString("hex"), //generates hex string of 24 bytes
//       alumni: alumni._id,
//     });
//     token = await token.save();
  
//     if (!token) {
//       return res.status(400).json({ error: "Failed to generate Token" });
//     }
  
//     //send email
  
//     const url = `http://localhost:5000/api/resetpassword/${token.token}`;
//     sendEmail({
//       from: "noreply@noreply.com.np",
//       to: alumni.email,
//       subject: "password reset email",
//       text: " Please Click to link to reset password",
//       html: `<a href="${url}"><button>Reset password</button></a>`,
//     });
  
//     return res.send({
//       message: "Password reset link has been sent to your email",
//     });
//   };
  
//   //to reset password
  
//   exports.resetPassword = async (req, res) => {
//     const token = await Token.findOne({ token: req.params.token });
  
//     if (!token) {
//       return res
//         .status(400)
//         .json({ error: "Invalid token or token may have expired" });
//     }
//     //find alumni
  
//     let alumni = await User.findById(token.alumni);
//     if (!alumni) {
//       return res.status(400).json({ error: "something went wrong" });
//     }
//     alumni.password = req.body.password;
  
//     alumni = await alumni.save();
  
//     if (!alumni) {
//       return res.status(400).json({ error: "something went wrong" });
//     }
//     res.send({ message: "password reset succesfully" });
//   };
  
  
//   // to get alumni lists
  
//   exports.getAlumniList = async (req, res) => {
//     let alumnis = await Alumni.find().select(["username","email"]);
//     if (!alumnis) {
//       return res.status(400).json({ error: "Cannot Find the user list" });
//     }
//     res.send(alumnis)
//   }
  
//   //to view alumni details
  
//   exports.alumniDetails = async (req, res) => {
//     let alumni = await Alumni.findById(req.params.id);
  
//     if (!alumni) {
//       return res.status(400).json({ error: "Unable to find the user Details" });
//     }
//     res.send(alumni);
//   };
  
//   //to view alumni details by username
//   exports.alumniDetails1 = async (req, res) => {
//     let alumnis = await Alumni.find({ username: req.body.username });
  
//     if (!alumnis) {
//       return res.status(400).json({ error: "Unable to find the user Details" });
//     }
//     res.send(alumnis);
//   };
  
//   //to update  alumni
  
//   exports.updateAlumni = async (req, res) => {
//     let alumniToUpdate = await Alumni.findByIdAndUpdate(
//       req.params.id,
      
//          {
//             user_username: req.body.user_name,
//             user_email: req.body.user_email,
//             isVerified:req.body.isVerified,
//             role:req.body.role
           
//           },{new:true})
  
//     if (!alumniToUpdate) {
//       return res.status(400).json({ error: "Unable to update user information" });
//     }
  
//     res.send(alumniToUpdate);
//   };
  
  
//   exports.deleteAll  = async (req, res) => {
//     try {
//       await Alumni.remove({});
//       res.status(200).send("All alumnis are deleted");
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Error deleting users");
//     }
//   }
  
  
// //signin process

// exports.signIn = async (req,res) => {
  
//     let{email,password,} = req.body
//     //to check email
//     let alumni = await Alumni.findOne({email:email})
//     if(!alumni){
//       return res.status(400).json({error:"Email"})  }
//     //check password
  
//     if(!alumni.authenticate(password)){
//       return res.status(400).json({error:"Email and password do not matched"})
//     }
  
//     //check if verified or not
  
//   //check if verified
  
//   if(!alumni.isVerified){
//     return res.status(400).json({error:"Alumni not verified"})
//   }
//   //create sign in in token
  
//   let token = jwt.sign({alumni:alumni._id,role:alumni.role},process.env.JWT_SECRET)
  
//   //set cookies
//   res.cookie('mycookie',token,{expire:Date.now()+86400})
  
//   // to return info to frontend
//   let {_id,username,role}= alumni
  
//   res.send({token,alumni:{_id,username,email,role}})
//   }
  


// //Get all alumni

// exports.getAllAlumnis = async(req,res) =>{
//     let alumnis = await Alumni.find()
//     if(!alumnis){
//         return res.status(400).json({error:"Something went wrong"})

//     }
//     res.send(alumnis)
// }

// //to get alumni details
// exports.alumniDetails = async (req,res)=>{

//     let alumni = await AlumniToAdd.findById(req.params.id)

//     if(!alumni){
//         return res.status(400).json({error:"Something went wrong"})
//     }
//     res.send(alumni)
// }

// //To update Alumni

// exports.updateAlumni = async (req,res) =>{
//     let alumniToUpdate= await Alumni.findByIdAndUpdate(req.body.params.id,{
//         alumni_name:req.body.alumni_name
//     },{new:true})
    
//     if(!alumniToUpdate){
//         return res.status(400).json({error:"Unable to update desired Alumni"})
//     }
//     res.send(alumniToUpdate)
// }





// // //to add new Alumni
// // exports.addAlumni =  async(req,res) =>{
    
// //     let alumniToAdd = new Alumni ({
// //         name: req.body.name,
// //         yearGraduated: req.body.yearGraduated,
// //         courseCompleted: req.body.courseCompleted

// //     })
// //     alumniToAdd = await alumniToAdd.save()

// //     if(!alumniToAdd){

    
// //     return res.status(400).json({error:"Failed to add Alumni"})
// // }
// //     res.send(alumniToAdd)
// // }


//     // alumniToAdd = await  alumniToAdd.save()
//     // .then(alumniToAdd =>{
//     //     res.json(alumniToAdd)
//     // })
//     // .catch(err =>{
//     //     res.status(400).json({error:err.message})
//     // })
