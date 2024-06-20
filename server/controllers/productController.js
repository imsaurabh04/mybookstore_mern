const Product = require("../models/Product");

// Enable filtering, sorting and pagination feature
class APIfeatures {
    constructor (query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = {...this.queryString};
        const excludedFields = ["page", "sort", "limit"];
        excludedFields.forEach(el => delete(queryObj[el]));

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        // Parse the string back to JSON
        const parsedQuery = JSON.parse(queryStr);
        this.query.find(parsedQuery);

        return this;
    }

    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join("");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1;
        const limit = this.queryString.limit * 1;
        
        const skip = (page-1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

const productController = {

    getAll: async(req, res) => {
        try {
            const apiFeatures = new APIfeatures(Product.find(), req.query).filtering().sorting().pagination();
            const productList = await apiFeatures.query;
            res.status(200).json({ productList });
            
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getProductById: async(req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById({id});
            if(!product) return res.status(400).json({ message: "Product does not exist."})
            res.status(200).json({product});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    createProduct: async(req, res) => {
        try {
            const { 
                title, 
                description,
                isbn,
                author,
                images,
                price,
                category
            } = req.body;

            const product = await Product.findOne({ isbn });
            if(product) return res.status(400).json({ message: "This book already exists." });

            const newProduct = new Product({
                title, 
                description,
                isbn,
                author,
                images,
                price,
                category
            })
            await newProduct.save();
            res.status(200).json({ message: "Product created successfully." })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateProduct: async(req, res) => {
        try {
            const { id } = req.params;
            const { 
                title, 
                description,
                author,
                images,
                price,
                category
            } = req.body;
            
            await Product.findByIdAndUpdate(id, {
                title, 
                description,
                author,
                images,
                price,
                category
            })
            res.status(200).json({ message: "Product updated successfully." })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteProduct: async(req, res) => {
        try {
            const { id } = req.params;
            await Product.findByIdAndDelete(id);
            res.status(200).json({ message: "Product deleted successfully." })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
} 

module.exports = productController;