const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async(req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token) return res.status(400).json({ message: "Invalid Authentication" });
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({ message: "Invalid Authentication" });

            req.user = user;
            next();
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = auth;