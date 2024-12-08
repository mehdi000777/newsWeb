import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const verfiyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.body.Authorization;

    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        asyncHandler(async (err, decode) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });

            const user = await User.findById(decode.id);

            req.user = user;

            next();
        }))
}

export const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: "you are not admin" });

    next();
}