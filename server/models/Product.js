const mongoose =  require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true},
    description: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true},
    images: { type: Array, required: true},
    category: { type: String, required: true, trim: true }

}, { timestamps: true })

module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);
