import { Router } from 'express'
import {  SignUp ,SignIn} from './auth.service.js';
import { generalLogin, generalSignup, loginSchema, signupSchema } from './auth.validation.js';
import HttpAppError from '../../Utils/Security/Errors/app.error.js';
import { validation } from '../../middleware/validation.middleware.js';

const authController = Router(); 
//creating new user

authController.post("/signup",validation(generalSignup), async (req, res) => {

    const result = await SignUp(req.validate.body)
    return res.status(201).json({ message: "user registered succefully", data:result })
})


//signin

authController.post("/signin",validation(generalLogin),async (req,res,next)=>{
   

     const result = await SignIn(req.validate.body)
    return res.status(200).json({ message: "user logged succefully", data:result })
})




export default authController