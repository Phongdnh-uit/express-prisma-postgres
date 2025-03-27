import { validateJWT } from "../utils/jwt.util";

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        res.json({
            message: "Not authorized",
        });
        return;
    }

    const [, token] = bearer.split(" ");
    if (!token) {
        res.status(401);
        res.json({
            message: "Not a valid token",
        });
        return;
    }

    try {
        const user = validateJWT(token);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401);
        res.json({ message: "Not a valid token" });
    }
};
