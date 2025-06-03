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
}