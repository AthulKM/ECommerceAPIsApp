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

        const hashedPassword = await bcrypt.hash(req.body.password, 12);


        const user = new User({
            "username": req.body.username,
            "email": req.body.email,
            "password":hashedPassword
        });

        await user.save();

        const token = jwt.sign({
            id:user._id
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

export const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                status: "failure"
            });
        }
        const isMatching = await bcrypt.compare(req.body.password, user.password);

        if (!isMatching) {
            return res.status(400).json({
                message: "Invalid Password",
                error: true,
                status: "Failure"
            });
        }
        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY,
            { expiresIn: '1h' });
        
        return res.status(200).json({
            message: "Login successful",
            error: false,
            status: "Success",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            status: "Failure"
        });
    }
};

