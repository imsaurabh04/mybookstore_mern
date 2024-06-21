const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {

    signup: async(req, res) => {
        try {

            const { name, email, password } = req.body;
            const user =  await User.findOne({ email });

            if (user) return res.status(400).json({ message: "Email is already registered." })

            if(password.length < 8) return res.status(400).json({ message: "Your password must be at least 8 characters." })

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name, 
                email,
                password: hashedPassword
            })
            await newUser.save();

            // create jwt for authentication
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                path: `/api/users/refreshtoken`
            })

            res.status(200).json({ accessToken })

        } catch (err) {
            res.status(500).json({ message: "Internal server error"});
        }
    },
    refreshToken: async(req, res) => {

        try{
            const rf_token = req.cookies.refreshToken;

            if(!rf_token) return res.status(400).json({ message: "Please Login or Signup" });
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    
                if(err) return res.status(400).json({ message: "Please Login or Signup" });
                const accessToken = createAccessToken({ id: user.id });
                res.status(200).json({ user, accessToken })
            })
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if(!user) return res.status(400).json({ message: "User does not exist." })
            
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({ message: "Sorry, that password is incorrect." })

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                path: `/api/users/refreshtoken`
            })

            res.status(200).json({ accessToken })

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie("refreshToken", {
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                path: `/api/users/refreshtoken` })
            res.status(200).json({ message: "You have been successfully logged out." }) 
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    getUserInfo: async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            if(!user) return res.status(400).json({ message: "User not found" });
            res.status(200).json(user);
            
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = userController;

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}
