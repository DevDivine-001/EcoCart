import bcryptjs from "bcryptjs"
import { User } from "../model/UserModel.js"
import { generateTokenCookie } from "../utils/GenerateTokenCookie.js"
import { verify } from "jsonwebtoken"

// create a user
export const Signup = async (req, res) => {

    const { UserName, FirstName, LastName, email, Password } = req.body

    try {
        if (!UserName || !FirstName || !LastName || !email || !Password) {
            throw new Error("All fields are require")
        }
        const userAlreadyExists = await User.findOne({ UserName });
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcryptjs.hash(Password, 10)
        const user = new User({ UserName, FirstName, LastName, email, Password: hashedPassword })
        await user.save()

        res.status(201).json("User created successfully")
    } catch (error) {

        res.status(400).json({ success: false, message: error.message })
    }
}

// verify User Email verifyEmail

export const verifyEmail = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Login User

export const LogIn = async (req, res) => {
    const { UserName, Password } = req.body

    try {
        const checkUser = await User.findOne({ UserName })
        if (!checkUser) {
            return res.status(401).json({ success: false, message: "Wrong credentials" })

        }
        const checkPassword = await bcryptjs.compareSync(Password, checkUser.Password)
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Wrong credentials" })

        }
        generateTokenCookie(res, checkUser._id)
        await checkUser.save()

        res.status(200).json({
            success: true,
            massage: "LogIn successfully",
            checkUser: {
                id: checkUser._id,

            }

        })

    } catch (error) {
        console.log("Error in Login", error)
        res.status(400).json({ success: false, message: error.massage })
    }
}

// Logout User

export const LogOut = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Login out successfully" })
    console.log(req)
}