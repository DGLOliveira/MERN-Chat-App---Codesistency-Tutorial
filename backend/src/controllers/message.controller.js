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
        const userToChatId = req.params.id;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
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
        let imgResult;
        if(!image && !req.body.text){ 
            res.status(400).send("No text or image provided");
        };
        if(image){
            const result = await cloudinary.uploader.upload(image);
            imgResult = result.secure_url;
        }
        const message = await Message.create({
            senderId: req.user._id,
            receiverId: req.params.id,
            message: req.body.text,
            image: imgResult ? imgResult : ""
        });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).send("Internal server error");
        console.log("Error in sendMessage controller: " + error);
    }
};