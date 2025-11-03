import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}



const User = mongoose.model('User', userSchema);


export default User;