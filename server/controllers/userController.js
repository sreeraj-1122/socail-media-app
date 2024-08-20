import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user

const loginUser = async (req, res,next) => {
    const { email, password } = req.body
    try {  
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true, secure: true}); // Set secure: true in production
        res.json({ success: true, token,message:"Login successfull" })
    } catch (error) {
        next(error);
    }

}

//create token

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user

const registerUser = async (req, res,next) => {
    const { name, email, password } = req.body
    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            res.json({ success: false, message: "User already exists" })
        }
        //validating email format and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const newUser = new userModel({
            name,
            email,
            password,
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.cookie('token', token, { httpOnly: true, secure: true}); // Set secure: true in production

        res.json({ success: true, token ,message:"register successfull"})

    } catch (error) {
        next(error);
    }
}
export { loginUser, registerUser }