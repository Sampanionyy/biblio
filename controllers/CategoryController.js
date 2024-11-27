const CategoryService = require("../services/CategoryService");

class CategoryController {
    async addCategory(req, res) {
        const { name } = req.body;
        try {
            const category = await CategoryService.createCategory(name);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.render("categories/index", { categories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CategoryController();
