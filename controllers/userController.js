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
            "password": hashedPassword,
            "role":req.body.role
        });

        await user.save();

        const token = jwt.sign({
            _id: user._id,
            role:user.role
        }, process.env.SECRET_KEY, { expiresIn: '24h' }
        );
        
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
        const user = await User.findOne({ "email": req.body.email });
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
            _id: user._id,
            role:user.role
        }, process.env.SECRET_KEY,
            { expiresIn: '24h' });
        
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

export const userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            res.status(404).json({
                message: "User does not exist !!!",
                error: true,
                status: "Failure"
            });

        }
        return res.status(200).json({
            message: "User profile fetched successfully",
            error: false,
            status: "Success",
            user: user
        });
    } catch (error) {
        res.send(500).json({
            message: error.message,
            error: true,
            status: "Failure"
        });
    }
};

