const CategoryRepository = require("../repositories/CategoryRepository");
const CategoryDTO = require("../dtos/CategoryDTO");

class CategoryService {
    async createCategory(name) {
        const category = await CategoryRepository.createCategory({ name });
        return new CategoryDTO(category.id, category.name);
    }

    async getAllCategories() {
        const categories = await CategoryRepository.getAllCategories();
        return categories.map(
            (category) => new CategoryDTO(category.id, category.name)
        );
    }

    async deleteCategory(id) {
        const category = await CategoryRepository.getCategoryById(id);
        if (!category) {
            throw new Error("category not found");
        }

        try {
            await CategoryRepository.deleteCategory(id);
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = new CategoryService();
