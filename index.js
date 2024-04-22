const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
// JWT_SECRET_KEY = gfg_jwt_secret_key
// TOKEN_HEADER_KEY = gfg_token_header_key
const URI = process.env.MONGO_URI;
const secret = process.env.SECRET
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.use(express.json())
const userRouter = require("./routes/signupRoute");
const { required } = require("nodemon/lib/config");
app.use("/log", userRouter)
const socket = require("socket.io");
const { string } = require("yup");


const PORT = process.env.PORT || 4400;
const connection = app.listen(PORT, () => {
  console.log("Server started at port" + PORT);
});

const connect = async () => {
  const uri = process.env.MONGO_URI;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
connect();
// const emmit = require("./models/usersModel")

// var chatSchema = mongoose.Schema({
//   message: string,
//   created: {type: Date, default: Date.now}
// })
// var Chat = mongoose.model('message', chatSchema);

let io = socket(connection, {
  cors: { origin: "*" }
})
io.on("connection", (socket) => {
  // var newmessage = Chat({message: message});
  // newmessage.save(function(err){
  //   if (err) {
  //     console.log(err);
  //   }
  // })
  console.log('A user connected successfuly');
  console.log(socket.id);
  socket.on('newmessage', (message) => {
    console.log(message);
    io.emit("receivemessage", message)
    // const db = getDatabaseConnection(); // Pseudo-function to get your DB connection

    // Assuming you have a database function to save the file info
    // saveFileToDatabase(db, req.file)
    //     .then(() => {
    //         res.json({ message: 'File saved to database successfully.' });
    //     })
    //     .catch((error) => {
    //         console.error("Database Error:", error);
    //         res.status(500).json({ message: 'Error saving file to database.' });
    //     });
    // message.save()
  })
})

// function saveFileToDatabase(db, file) {
//   // Use the database connection to insert file details.
//   // This will be specific to your database technology.
//   // For example, with MongoDB:
//   return db.collection('files').insertOne(file);
// }

io.on("disconnection", (socket) => {
  socket.on("disconnecting", (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      } 
    }
  });
});

//  const connectToMongo =()=>{
// mongoose.connect=(URI,(err)=>{
//     if(err){
//     console.log("Mongoose no gree connect");
//     }else{
//         console.log("Mongoose has connected succefully");
//     }
// });
//  }

// module.exports = connect;