const nodeMailer = require("nodemailer")

const sendMail = async(email) => {
    const mailTemplate = `
        <h1>Dear ${email}, </h1>
        <br>
        <p>
            Welcome to my application. I hope You enjoy it here
        </p>
    `
    const transport = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.EMAIL,
        to:email,
        subject:"Welcome message",
        text:"Our app",
        html:mailTemplate
    }
    try {
        await transport.sendMail(mailOptions)
        console.log("mail sent")
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = {sendMail}