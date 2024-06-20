const Category = require("../models/Category");


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


const categoryController = {

    getAll: async(req, res) => {
        try {
            const apiFeatures = new APIfeatures(Category.find(), req.query).filtering().sorting().pagination();
            const categoryList = await apiFeatures.query;
            res.status(200).json({ categoryList });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createCategory: async(req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name });

            if(category) return res.status(400).json({ message: "Category already exists." });

            const newCategory = new Category({
                name
            })
            await newCategory.save();
            res.json({ message: "Category created successfully."});

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const { id } = req.params;
            await Category.findByIdAndDelete(id);
            res.status(200).json({ message: "Category deleted successfully." })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateCategory: async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Category.findByIdAndUpdate(id, { name })
            res.status(200).json({ message: "Category updated successfully." })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
} 

module.exports = categoryController;
