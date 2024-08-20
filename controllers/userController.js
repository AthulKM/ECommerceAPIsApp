import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorResponse from "../utils/errorResponse.js";


export const userRegistration = async (req, res) => {
    
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            throw new ErrorResponse("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);


        const user = new User({
            "username": req.body.username,
            "email": req.body.email,
            "password": hashedPassword,
            "role":req.body.role
        });

        await user.save();

        
        
        return res.status(201).json({
            message: "Registration successful",
            status: "Success",
            error: false,
            token:token
        });

    
};

export const userLogin = async (req, res, next) => {
    
        const user = await User.findOne({ "email": req.body.email });
        if (!user) {
            throw new ErrorResponse("User not found", 400);
        }
        const isMatching = await bcrypt.compare(req.body.password, user.password);

        if (!isMatching) {
            throw new ErrorResponse("Invalid Password", 400);
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
    
};

export const userDetails = async (req, res, next) => {
    
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return next(ErrorResponse("User does not exist !!!", 404));

        }
        return res.status(200).json({
            message: "User profile fetched successfully",
            error: false,
            status: "Success",
            user: user
        });
    
};

