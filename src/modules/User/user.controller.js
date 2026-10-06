import { DeleteUser, GetAllUsers, GetUserProfile, UpdateProfile } from "./user.service.js";
import { Router } from "express";
import { validation } from './../../middleware/validation.middleware.js';
import { generalUpdateSchema, generalUserIdSchema } from "./user.validation.js";
const userController = Router();



//get user profile

userController.get("/profile/:userId", validation(generalUserIdSchema),async (req,res)=>{
    const userId=req.validate.params.userId
    const result= await GetUserProfile(userId)
    return res.status(200).json({ message: "user profile fetched succefully", data:result })
})

//update profile
userController.patch("/update/:userId",validation(generalUpdateSchema),async (req,res)=>{
     const { params, body } = req.validate
    const result= await UpdateProfile(params.userId ,body)
    return res.status(200).json({ message: "user profile updated succefully", data:result })
})


//delete user
userController.delete("/delete/:userId",validation(generalUserIdSchema),async (req,res)=>{
     const { params } = req.validate;
    const result= await DeleteUser(params.userId)
    return res.status(200).json({ message: "user profile deleted succefully", data:result })
})


//get all users

userController.get("/profile",async (req,res)=>{
    const result= await GetAllUsers()
    return res.status(200).json({ message: "all users profiles fetched succefully", data:result })
})

export default userController;
