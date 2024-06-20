const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
const router = require("express").Router();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

router.post("/", auth, authAdmin, async(req, res) => {
    try {
        const images = [];
        if(!req.files) {
            return res.status(400).json({ message: "No files were uploaded." })
        }
            
        const { files } = req.files;

        await Promise.all(files.map(async(file) => {
            if(file.size > 1024*1024) {
                removeTemp(file.tempFilePath);
                throw new Error("Image size is too large."); 
            }

            if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
                removeTemp(file.tempFilePath);
                throw new Error("File format is incorrect.");
            }

            const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, { folder: "mybookstore" });
            removeTemp(file.tempFilePath);
            images.push({
                public_id: uploadedImage.public_id,
                url: uploadedImage.secure_url });
        }));
        res.status(200).json({ images });
        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/destroy',auth,authAdmin,(req,res)=> {
    try{
        const {public_id}  = req.body;
        if(!public_id) return res.status(400).json({msg:"No images Selected"})

        cloudinary.uploader.destroy(public_id,async(err,result) => {
            if(err) throw err

            res.json({message: "Deleted"})
        })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
})

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = router;