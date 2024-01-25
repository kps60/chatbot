import { NextFunction, Response, Request } from "express"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import { createToken } from "../utils/token-manager.js"
import exp from "constants"
import { COOKIE_DOMAIN, COOKIE_NAME } from "../utils/constants.js"

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find()
        console.log("hello");
        return res.status(200).json({ message: "OK", users })
    } catch (error) {
        return res.status(400).json({ message: "ERROR", cause: error.message })
    }
}
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({ email: email })
        if (existinguser) {
            return res.status(401).json({ message: "user already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        //cookie and token
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: COOKIE_DOMAIN,
            signed: true,
            path: "/"
        })
        const token = createToken(existinguser._id.toString(), existinguser.email, "7d")

        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: COOKIE_DOMAIN,
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({ message: "OK", name: newUser.name, email: newUser.email, });
    } catch (error) {
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
}
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body;
        const existinguser = await User.findOne({ email: email })
        if (!existinguser) {
            return res.status(401).json({ message: "user does't exists" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existinguser.password)
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "for biddin password" })
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        })
        const token = createToken(existinguser._id.toString(), existinguser.email, "7d")

        const expires = new Date()
        expires.setDate(expires.getDate() + 7)

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });

        return res.status(200).json({ message: "OK", name: existinguser.name, email: existinguser.email, });
    } catch (error) {
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const existinguser = await User.findById(res.locals.jwtData.id)
        if (!existinguser) {
            return res.status(401).json({ message: "user does't exists OR roken malfunction" })
        }
        if (existinguser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permissions did't match" })
        }

        return res.status(200).json({ message: "OK", name: existinguser.name, email: existinguser.email, });
    } catch (error) {
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
}