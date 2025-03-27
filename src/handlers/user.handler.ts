import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/jwt.util";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            password: await hashPassword(req.body.password),
        },
    });

    res.json({ user });
};

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (!user) {
        res.status(401);
        res.json({
            message: "Username or password is incorrect",
        });
        return;
    }

    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
        res.status(401);
        res.json({
            message: "Username or password is incorrect",
        });
        return;
    }

    const token = createJWT(user);
    res.json({ token, user });
};

export const getAllUser = async (req, res) => {
    const users = await prisma.user.findMany();

    res.status(200);
    res.json({
        users,
    });
};

export const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        res.status(400);
        res.json({
            message: "user not found",
        });
        return;
    }

    res.status(200);
    res.json({ user });
};
