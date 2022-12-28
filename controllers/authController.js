import Auth from "../models/authUser.js"
import Jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const TOKEN = "Arun@123";

export const register = async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body;
        if(!(email && password && first_name && last_name)) {
            res.status(400).send("details are required");
        }

        const oldUser = await Auth.findOne({email});
        if(oldUser) {
            return res.status(409).send("User already exist. please login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await Auth.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        const token = Jwt.sign(
            { user_id: user._id, email },
            TOKEN,
            { expiresIn: "1h"}
        );

        user.token = token;
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!(email && password)) {
            res.status(400).send("email and password is required");
        }

        const user = await Auth.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = Jwt.sign(
                {user_id: user._id, email},
                TOKEN,
                {
                    expiresIn: "1h"
                }
            )

            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid credentials");
    } catch (error) {
        console.log(error);
    }
}