import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided.",
            status: "Failure",
            error: true
        });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified; 
        next(); 
    } catch (error) {
        return res.status(400).json({
            message: "Invalid token",
            status: "Failure",
            error: true
        });
    }
};

export const admin = (req, res, next) => {
    console.log('User role:', req.user.role); // Debug: log the user's role

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};




export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await User.findById(decoded._id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            console.log('Authenticated user:', req.user); // Log the authenticated user

            next();
        } catch (error) {
            console.error('JWT verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};


