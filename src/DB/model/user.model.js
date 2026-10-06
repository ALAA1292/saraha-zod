import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "firstName must be at least 3 chars"],
        maxLength: [30, "firstName can not be more than 30 chars"],
        lowercase: true,
        trim: true

    }
    ,

    lastName: {
        type: String,
        required: true,
        minLength: [3, "lastName must be at least 3 chars"],
        maxLength: [30, "lastName can not be more than 30 chars"],
        lowercase: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: { name: 'idx_email_unique' }
    },
    password: {
        type: String,
        required: true

    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    age: {
        type: Number,
        min: [18, "age must be at least 18"],
        max: [100, "age can not be more than 100"],
    },
    profilePicture: String,
    phoneNumber: String
},
    {
        virtuals:
        {
            fullName:
            {
                get() {
                    return `${this.firstName} __ ${this.lastName}`
                }
            }
        },
        toObject: { virtuals: true },       //has to be true so virtuals can work
        toJSON: { virtuals: true },         //has to be true so virtuals can work
        timestamps: true
    });

// console.log({ allModels: mongoose.Models })
const User = mongoose.model('User', userSchema);         //making model
export default User;