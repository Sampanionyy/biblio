const Category = require("../entities/Category");
class CategoryRepository {
    async createCategory(data) {
       return await Category.create(data);
    }

    async getAllCategories() {
       return await Category.findAll();
    }

    async getCategoryById(id) {
        return await Category.findByPk(id);
    }

    async deleteCategory(id) { 
        const cat = await this.getCategoryById(id); 
        console.log(cat)
        if (!cat) { 
            throw new Error('Category not found'); 
        }
        
        return await cat.destroy();
    }
}

module.exports = new CategoryRepository();
