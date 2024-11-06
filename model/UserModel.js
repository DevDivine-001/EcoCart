import mongoose from "mongoose";

// Username
// F Name
// L Name
// Password

export const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        require: true,
        unique: true,
    },
    FirstName: {
        type: String,
        require: true,
        unique: true,
    },
    LastName: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        validate: {
            validator: function (value) {
                const fakeDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];
                const domain = value.split('@')[1];
                return !fakeDomains.includes(domain);
            },
            message: "Please use a real email address, not a disposable one."
        }

    },
    Password: {
        type: String,
        require: true
    }

}, { timestamps: true })

export const User = mongoose.model('user', userSchema)