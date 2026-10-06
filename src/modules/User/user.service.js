import { isValidObjectId } from 'mongoose';
import User from './../../DB/model/user.model.js';
import { decrypt, encrypt } from '../../Utils/Security/encryption.secuirty.js';
import { compareTwoHashes, hash } from '../../Utils/Security/hash.secuirty.js';
import UserRepository from '../../DB/Repositories/user.repository.js';
import HttpAppError from '../../Utils/Security/Errors/app.error.js';

const userRepo = new UserRepository()


//get all users

export const GetAllUsers=async()=>{

        const users = await userRepo.FindDocuments();
return users;
}

//get user profile
export const GetUserProfile = async (userid) => {

    const user = await userRepo.FindDocumentById(userid);
    if (!user) {
        throw new HttpAppError(
            "user not found",
            404,
            {},
            "USER_NOT_FOUND"
        );
    }

   if (user.phoneNumber) {
    user.phoneNumber = decrypt(user.phoneNumber);
}
      return user;
}


//update user
export const UpdateProfile = async (userid, data) => {
const { firstName, lastName, email, password, gender, age, phoneNumber} = data;

    if (email) {
        const isEmailExists = await userRepo.FindOneDocument({ email, _id: { $ne: userid } })
        if (isEmailExists) {
            throw new HttpAppError(`user already exists`, 409, { duplicatedEmail: email }, 'EMAIL_CONFLICT');

        }
    }

    const updates = { firstName, lastName, email, gender, age };
    if (password) {
        updates.password = await hash(password);
    }
        if (phoneNumber) updates.phoneNumber = encrypt(phoneNumber);  

    const user = await userRepo.findUserByIdAndUpdate(userid, updates, { new: true, runValidators: true });

    if (!user) {
        throw new HttpAppError(
            "user not found",
            404,
            {},
            "USER_NOT_FOUND"
        );
    }
   if (user.phoneNumber) {
    user.phoneNumber = decrypt(user.phoneNumber);
}
   return user;
}


//delete user

export const DeleteUser = async (userid) => {

 const user = await userRepo.FindDocumentById(userid);
    if (!user) {
        throw new HttpAppError(
            "user not found",
            404,
            {},
            "USER_NOT_FOUND"
        );
    }
    const result = await userRepo.DeleteOneDocument({
        _id: userid
    });

    return result;
};
