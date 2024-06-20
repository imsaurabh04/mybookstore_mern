const express = require("express");
const connectDb = require("./middleware/connectDb");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const upload = require("./routes/upload");

const PORT = process.env.PORT || 8000;

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cookieParser());

app.use(fileUpload({
    useTempFiles:true
}))

// Connect to MongoDB
connectDb();

//Routes
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/upload", upload);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
    console.log("Server is running...");
})
