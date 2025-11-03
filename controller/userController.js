import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';

export const registerUser = async(req, res) => {
    try {
        const {username , email , password} = req.body;
        const existUser = await User.findOne({email});
        console.log(existUser);
        if(existUser){
            return res.status(400).json({message: "User already exists"});
        }
        const newUser = await User.create({username,email,password});

        res.status(201).json({message: "User registered successfully", user: newUser});
    } catch (error) {
        console.log("Error in registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        console.log("Comparing password for user:", user);
        const isPasswordValid = await user.comparePassword(password);
        console.log("Is password valid:", isPasswordValid);
        if(isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const expiresIn = 30 * 24 * 60 * 60; // 30 days in seconds
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn}
        );
        console.log("Generated token for user:", token);

        res.cookie("token",token,{
            httpOnly: true,
            maxAge: expiresIn * 1000, // in milliseconds
            secure: false,
        });
        user.password = undefined; // Remove password from user object before sending response
        res.status(200).json({message: "Login successful", user});
    } catch (error) {
        console.log("Error in user login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUser = async(req, res)=>{
    try {
        const userId = req.params.id;
        const {username, email, password} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {username, email, password},
            {new: true}
        );
        if(!updatedUser){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User updated successfully", user: updatedUser});
    } catch (error) {
        console.log("Error in updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteUser = async(req, res)=>{
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log("Error in deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserById = async(req, res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});
    } catch (error) {
        console.log("Error in fetching user by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find().select("-password");
        res.status(200).json({users});
    } catch (error) {
        console.log("Error in fetching all users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
