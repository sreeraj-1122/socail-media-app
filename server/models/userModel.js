import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for validating email format
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length of password
    },
    location: {
        type: String
    },
    profile: {
        type: String
    },
    profession: {
        type: String
    },
    views: [{
        type: String
    }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    verified: {
        type: Boolean,default:false
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Pre-save hook for password hashing (if needed)
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) { 
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Model for the User
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
