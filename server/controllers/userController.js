import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import User from "../models/userModel.js";
import FriendRequest from '../models/requestSchema.js';

//login user

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true, secure: true }); // Set secure: true in production
        res.json({ success: true, token, message: "Login successful", data: user })
    } catch (error) {
        next(error);
    }

}

//create token

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user

const registerUser = async (req, res, next) => {
    const { name, email, password, username } = req.body;

    try {
        // Ensure all required fields are provided
        if (!name || !email || !password || !username) {
            return res.status(400).json({ success: false, message: "Please provide all required fields, including username." });
        }

        // Check if user with this email already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Check if the username is already taken
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        // Validate email format and password strength
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        
        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            username, // Ensure username is saved properly
        });

        // Save the user to the database
        const user = await newUser.save();

        // Create a token for the user
        const token = createToken(user._id);

        // Set the token in a secure cookie
        res.cookie('token', token, { httpOnly: true, secure: true });

        // Send success response
        return res.status(201).json({ success: true, token, message: "Registration successful" });

    } catch (error) {
        next(error);
    }
};

//get user

const getUser = async (req, res, next) => {

    try {
        const { id } = req.params
        const { id: userId } = req.user;
        const user = await User.findById(id ?? userId).populate({
            path: "following",
            select: "password",

        })

        if (!user) {
            res.json({ success: false, message: "User not found" })
        }
        user.password = undefined
        res.json({ success: true, data: user })

    } catch (error) {
        next(error);
    }
}
// friend request

const friendRequest = async (req, res, next) => {
    try {
        const { requestTo } = req.body
        const { id: userId } = req.user;
        const requestExist = await FriendRequest.findOne({
            requestFrom: userId,
            requestTo
        })
        if (requestExist) {
            res.json({ success: true, message: "Friend request  already sent" })
            return
        }
        const accoundExist = await FriendRequest.findOne({
            requestFrom: requestTo,
            requestTo: userId
        })
        if (accoundExist) {
            res.json({ success: true, message: "Friend request  already sent" })
            return
        }
        const newRes = await FriendRequest.create({
            requestTo,
            requestFrom: userId,
        });

        res.status(201).json({ success: true, message: "Friend request sent successfully",data:newRes })


    } catch (error) {
        next(error);
    }
}
//update user

const updateUser = async (req, res, next) => {
    try {
        const { name, location, profession } = req.body;
        const { id: userId } = req.user;;

        // Check for missing fields
        if (!name || !location || !profession) {
            return res.status(400).json({ success: false, message: "Please provide all fields: name, location, and profession" });
        }

        // Check if a profile image is uploaded
        const profile = req.file ? req.file.path : undefined;

        // Create an update object dynamically, excluding fields not present
        const updateUser = {
            name,
            location,
            profession,
        };

        if (profile) {
            updateUser.profile = profile;  // Add profile if file is uploaded
        }

        // Update user in the database
        const user = await User.findByIdAndUpdate(userId, updateUser, { new: true });
       
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user });

    } catch (error) {
        next(error);
    }
};



// get friend request

const getFriendRequest = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const request = await FriendRequest.find({
            requestTo: userId,
            requestStatus: "Pending",
        }).populate({
            path: "requestFrom",
            select: "name profile profession"
        }).limit(10).sort({
            _id: -1,
        })


        res.status(200).json({ success: true, data: request })


    } catch (error) {
        next(error);
    }
}
// get friend request

const acceptRequest = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { rid, status } = req.body
        const requestExist = await FriendRequest.findById(rid)

        if (!requestExist) {
            res.json({ success: true, message: "No Friend request  found" })
            return
        }
        const newRes = await FriendRequest.findByIdAndUpdate({ _id: rid }, { requestStatus: status })

        if (status === 'Accepted') {
            const user = await User.findById(userId)
            user.following.push(newRes?.requestFrom)
            await user.save()
            const friend = await User.findById(newRes?.requestFrom)
            friend.following.push(newRes?.requestTo)

            await friend.save()

        }
        res.status(200).json({ success: true, message: "Friend request" + status })


    } catch (error) {
        next(error);
    }
}
// profile views

const profileViews = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id } = req.body
        const user = await User.findById(id)
        user.views.push(userId);
        await user.save()

        res.status(201).json({ success: true, message: "Successfull" })


    } catch (error) {
        next(error);
    }
}
// suggestedFriends

const suggestedFriends = async (req, res, next) => {
    try {
      const { id: userId } = req.user;
  
      // Construct query to find users the current user is not following
      const suggestedFriends = await User.find({
        _id: { $ne: userId },                // Exclude current user
        following: { $nin: [userId] }         // Users not being followed by current user
      })
        .limit(15)
        .select("name profile profession");
  
      // Send the response
      res.status(200).json({ success: true, data: suggestedFriends });
      
    } catch (error) {
      next(error);
    }
  };
  


export { loginUser, registerUser, getUser, updateUser, friendRequest, getFriendRequest, acceptRequest, profileViews, suggestedFriends }