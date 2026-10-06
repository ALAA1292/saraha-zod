import UserRepository from '../../DB/Repositories/user.repository.js';
import { encrypt } from '../../Utils/Security/encryption.secuirty.js';
import HttpAppError from '../../Utils/Security/Errors/app.error.js';
import { compareTwoHashes, hash } from '../../Utils/Security/hash.secuirty.js';

const userRepo = new UserRepository()
//creating new user

export const SignUp = async (body) => {
const { firstName, lastName, email, password, gender, age, phoneNumber } = body;
  const isUserExist = await userRepo.findUserByEmail(email);
  if (isUserExist) {
    throw new HttpAppError(`user already exists`, 409, { duplicatedEmail: email }, 'EMAIL_CONFLICT');
  }

  // const encryptedPhone = encrypt(phoneNumber)
const encryptedPhone = phoneNumber
    ? encrypt(phoneNumber)
    : undefined;
    
  //hashing password

  const hashedPassword = await hash(password)
  const user = await userRepo.CreateDocument({ firstName, lastName, email, password: hashedPassword, gender, age, phoneNumber: encryptedPhone });

  const result = user.toObject();
  delete result.password;
  return result;
};


//signin

export const SignIn = async (data) => {
  const { email, password } = data
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new HttpAppError(
      "wrong email or password",
      400,
      {},
      "INVALID_CREDENTIALS"
    );
  }
  const isPasswordCorrect = await compareTwoHashes(user.password, password)
  if (!isPasswordCorrect) {
    // throw new Error(`wrong email or password`);
    throw new HttpAppError(
      "wrong email or password",
      400,
      {},
      "INVALID_CREDENTIALS"
    );
  }
  const result = user.toObject();
  delete result.password;
  return result;
}

