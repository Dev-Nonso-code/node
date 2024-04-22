const yup = require("yup");
const { uploadchat, fileupload } = require("../controllers/usersController");

const registerUserValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, 'First name is too Short!')
        .max(50, 'Too Long!')
        .required('Required first name')
        .matches(/^[a-zA-Z]+$/),
    lastName: yup
        .string()
        .min(2, 'Last name is too Short!')
        .max(50, 'Too Long!')
        .required('Required last name')
        .matches(/^[a-zA-Z]+$/),
     email: yup
         .string()
        .email("Invalid email address")
         .required("Email is required email")
         .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
    password: yup
        .string()
        .matches(/^.{8,}$/, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
});

const signinValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required email")
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
    password: yup
        .string()
        .matches(/^.{8,}$/, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
})

module.exports = { registerUserValidationSchema, signinValidationSchema }