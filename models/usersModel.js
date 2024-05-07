const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { type } = require("express/lib/response");



const userSchema = new mongoose.Schema({
    firstname: { type: String, required:true },
  lastname: { type:String, required:true },
  email: { type:String, unique:true, required:true },
  password: { type:String, required:true},
  registrationDate : { type: Date,default:Date.now()},
  profileimage : {type: {}, required: true}
  // registrationTime : {type: Time,default:Time.now()}
});



// userSchema.method.validatePassword = function(password,
//   callback){
//     console.log(password);
//     console.log(this);
//     bcryptjs.compare(password,this.password,(err,result)=>{
//       // console.log(result);
//       if(!err){
//         callback(err,result)
//       }else{
//         next()
//       }
//     })
//   }

let saltRound = 15; //The number of times our password is to be hashed
userSchema.pre("save", function (next) {
  bcryptjs
    .hash(this.password, saltRound)
    .then((hashed) => {
      this.password = hashed;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

// const usersModel = mongoose.models.users_tbs || mongoose.model("users_tbs", userSchema);
// module.exports = usersModel;

const usersModel = mongoose.models.users_collections || mongoose.model("users_collections", userSchema);

module.exports = usersModel;
