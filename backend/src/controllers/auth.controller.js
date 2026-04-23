import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        generateToken(user._id, res);
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in login controller: " + error);
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in logout controller: " + error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, profileImage } = req.body;
        if (!fullname) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        if(!fullname && !profileImage){ 
            return res.status(400).json({ error: "No fields to update" });
        }
        if(fullname){ 
            user.fullname = fullname;
        }
        if(profileImage){ 
            if(user.profileImage){
                await cloudinary.uploader.destroy(user.profileImage);
            }
            const result = await cloudinary.uploader.upload(profileImage);
            user.profileImage = result.secure_url;
        }
        const updatedUser = await user.save();
        res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in updateProfile controller: " + error);
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({ message: "User is authenticated", user: req.user });
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in checkAuth controller: " + error);
    }
}