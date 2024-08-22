import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "role": {
        type: String,
        enum: ['user', 'admin'], // Restrict to specific roles
        required:true,
        default: 'user' // Default role is 'user'
    }
});

const User = model('User', userSchema);

export default User;