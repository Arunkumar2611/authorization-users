import Jwt from "jsonwebtoken";
const TOKEN = "Arun@123";

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["access-token"];

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decode = Jwt.verify(token, TOKEN);
        req.user = decode;
    } catch(err) {
        return res.status(401).send("Invalid token");
    }

    return next();
}

export default verifyToken;