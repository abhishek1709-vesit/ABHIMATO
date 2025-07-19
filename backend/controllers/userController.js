import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const logInUser = async (req, res) => {
    const {email, password} = req.body
    console.log(password)
    console.log(email)
    try {
        const user = await userModel.findOne({email})
        if(!user){
            res.json({success:false, message:"User does not exist"})
        }
        console.log(user.password)

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error while log in"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body
    try {
        //checking user exists
        const exist = await userModel.findOne({email})
        
        if(exist){
            return res.json({success:false, message:"User already exists"})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Enter a strong password"})
        }

        //encrypting/hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()

        //creating a token
        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error) {
        console.log(error.message)
        return res.json({success:false, message:"Registeration failed please try again"})
    }
}

export {logInUser, registerUser}