import jwt from "jsonwebtoken"


export const generateTokenCookie = (res, userId) => {
    const token = jwt.sign({ id: userId },
        process.env.JWT_SECRET, {
        expiresIn: "5d"
    })
    res.cookie("token", token, {
        httOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 100

    })
    // .status(200).json("")
    return token
}