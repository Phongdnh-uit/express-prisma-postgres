import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { throws } from "assert";

export const comparePasswords = (password, hashPasword) => {
    return bcrypt.compare(password, hashPasword);
};

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
    );
    return token;
};

export const validateJWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        throws(e);
    }
};
