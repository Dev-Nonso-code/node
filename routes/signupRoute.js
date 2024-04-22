const express = require("express");
const router = express.Router();
const {landingpage,registerUser,signin,geTdashboard, fileupload, uploadchat} = require("../controllers/usersController")
const { registerUserValidationSchema, signinValidationSchema, uploadchatValidationSchema, fileuploadValidationSchema } = require("../middleware/usersValidatr")
const { validate } = require("../middleware/validae")

router.get("/",landingpage)
router.get("/dashboard", geTdashboard)
router.post("/signup",registerUser)
router.get("/signup",registerUser)
router.post('/signin', signin)
router.post('/upload', fileupload)
router.post('/chat', uploadchat)



module.exports = router;