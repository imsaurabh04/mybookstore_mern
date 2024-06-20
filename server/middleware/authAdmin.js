const User = require("../models/User");

const authAdmin = async(req, res, next) => {

    try {
       const user = await User.findById(req.user.id);
       if(!user) return res.status(400).json({ message: "Invalid Authentication" });

       if(user.role === 0) {
            return res.status(400).json({ message: "Admin Resources Access Denied" })
       }
       next();
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = authAdmin;