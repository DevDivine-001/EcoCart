require("dotenv").config();
// const axios = require("axios");
import axios from "axios";

export const sendOTPEmail = async (toEmail, otp) => {
    const data = {
        from: "your_verified_sender@yourdomain.com",
        from_name: "Your Company Name",
        to: [{ email: toEmail }],
        subject: "Your OTP Verification Code",
        html: `Hello, your OTP code is <b>${otp}</b>. Please use this code to complete your verification.`,
    };

    try {
        await axios.post("https://api.mailersend.com/v1/email", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
            },
        });
        console.log("OTP email sent successfully");
    } catch (error) {
        console.error("Error sending OTP email:", error.response.data);
    }
}

// module.exports = { sendOTPEmail };
