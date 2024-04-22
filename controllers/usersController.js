const usersModel = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
// const { cloudinary } = require("../config/cloudinary.config")
// const uploadModel = require("../models/uploadModel")
// const { sendMail } = require("../utils/mailer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

// import { v2 as cloudinary } from 'cloudinary';
// import { required } from 'nodemon/lib/config';

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const landingpage = (req, res) => {
  res.send([
    { name: "devnonso", age: 22 },
    { name: "exhibit", age: 20 },
    { name: "obasi", age: 19 },
  ]);
};

const uploadchat = (req, res) => {
  console.log(req.body);
  let chat = new usersModel(req.body)
}

const registerUser = async (req, res, next) => {
  let email = req.body.email;
  try {
    await usersModel.find({ email: email }).then((result) => {
      if (result.length > 0) {
        res
          .status(409)
          .send({ message: "Email already exists.", status: false });
      } else {
        // let userData = {
        //   firstName: req.body.firstname
        // }

        let form = new usersModel(req.body);
        form
          .save()
          .then((result1) => {
            console.log(result1);
            console.log(req.body);
            console.log("your data has saved to database");
            // sendMail(email); //This function carries our user email as params.
            res
              .status(201)
              .send({
                message: "Account has been created successfully",
                status: true,

              });

            // console.log(req.body);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  } catch (error) {
    next(error);
  }
};

// const signin = (req, res)=>{
//   usersModel.find({email:req.body.email, password:req.body.password}, (err,result)=>{
//     if(err){
//       console.log(err);
//     }else{
//       console.log(result);
//     }
//   })
// }

const fileupload = async(req, res) => {
  let myfile = req.body.myfile
  console.log(myfile);
  try {
   const result = await cloudinary.uploader.upload(myfile)
   console.log(result);
   const myImagelink = result.secure_url
   if(!result){
    res.send({ message: "an error occured ", status: false, myImagelink })
   }
   return res.send({ message: "image upload sucessful ", status: true, myImagelink })
    // cloudinary.uploader.upload(myfile, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     const myImagelink = result.secure_url
    //     res.send({
    //       message: "Image upload successful",
    //       status: true, myImagelink
    //     })
    //   }
  }catch(error){
    console.log(error)
  }
  // { public_id: "olympic_flag" },
  // function (error, result) { console.log(result); });
}

const signin = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  // let secret = secret;
  let firstname = req.body.firstname
  try {
    await usersModel.find({ email: email }).then((result) => {
      if (result.length === 0) {
        res.status(404).send({ message: "You don't have an account with us", status: false })
      } else {
        bcryptjs.compare(password, result[0].password).then((result2) => {
          console.log(result2)
          console.log(password);
          if (result2) {
            const token = jsonWebToken.sign({ email }, "secretkey", { expiresIn: 30 })
            console.log(token)
            res.status(200).send({ message: "Welcome" + result[0].firstname, status: true, token })
            res.send.body
          } else {
            res.status(401).send({ message: "Invalid password", status: false })
          }
        })
      }
    }).catch((error) => {
      console.log(error)
      res.status(500).send({ message: "Sign in failed", status: false })
    })
  } catch (error) {
    return next(error)
  }
}

const geTdashboard = (req, res) => {
  let token = req.headers.authorization.split(" ")[1]
  console.log(token, "token")
  jwt.verify(token, "secretkey", (error, result) => {
    if (error) {
      console.log(error, "error");
      res.status(401).send({ message: "you can never make it ", status: false })
      //  return next(error)
    } else {
      let email = result.email
      res.status(200).send({ message: "congrate", status: true, email })
      console.log(result)

    }
  })
}

// const registerUser = (req, res) => {
//   console.log(req.boy);
// };

module.exports = { landingpage, registerUser, signin, geTdashboard, fileupload, uploadchat };
