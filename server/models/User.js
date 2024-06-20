const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    cart: { type: Array, default: [] }
}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
