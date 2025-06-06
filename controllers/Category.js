const Category = require('../models/Category');

exports.createCategory = async (req,res) => {
    try {
        const {categoryName} = req.body;
        const category = await Category.create({categoryName});
        res.status(201).json(
            {
                success: true,
                data: category,
                message: `Category Created Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in createCategory`,
                message: err.message
            }
        );
    }
};

exports.getCategories = async (req,res) => {
    try {
        const categories = await Category.find({},{categoryName: true,courses: true});
        res.status(200).json(
            {
                success: true,
                data: categories,
                message: `Ok`
            }
        );
    }
    catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `error in getCategories`,
                message: err.message
            }
        );
    }
};