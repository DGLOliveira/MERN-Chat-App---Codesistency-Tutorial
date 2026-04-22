import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    try {
        const { email, password, fullname, profileImage } = req.body;
        if (!email || !password || !fullname) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "Password should be at least 8 characters long" });
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password should contain at least one number, one lowercase letter, one uppercase letter and one special character" });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullname,
            profileImage
        });
        if (newUser) {
            generateToken(newUser._id, res);
            res.status(201).json({
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    fullname: newUser.fullname,
                    profileImage: newUser.profileImage
                }
            });
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in signup controller: " + error);
    }
}

export const login = (req, res) => {
    res.send("login route")
}

export const logout = (req, res) => {
    res.send("logout route")
}
