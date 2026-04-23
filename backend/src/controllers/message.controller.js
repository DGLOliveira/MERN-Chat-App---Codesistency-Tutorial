import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in getUsers controller: " + error);
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: userToChatId },
                { sender: userToChatId, receiver: senderId },
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in getMessages controller: " + error);
    }
};

export const sendMessage = async (req, res) => {
    try {
        const image = req.body.image;
        if(image){
            const result = await cloudinary.uploader.upload(picture);
            image = result.secure_url;
        }
        const message = await Message.create({
            sender: req.user._id,
            receiver: req.params.id,
            message: req.body.message,
            image: image ? image : ""
        });
        
        res.status(201).json(message);
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in sendMessage controller: " + error);
    }
};