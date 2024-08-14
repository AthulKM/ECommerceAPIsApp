import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userRegistration = async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists", status: "Failure",
                error: true
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const user = new User({
            "username": req.body.username,
            "email": req.body.email,
            "password":hashedPassword
        });

        await user.save();

        const token = jwt.sign({
            username: user.username,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '1h' }
        );
        console.log(process.env.SECRET_KEY);
        return res.status(201).json({
            message: "Registration successful",
            status: "Success",
            error: false,
            token:token
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

