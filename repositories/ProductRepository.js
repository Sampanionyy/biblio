    const Product = require("../entities/Product");
    class ProductRepository {
        async createProduct(data) {
            return await Product.create(data);
        }

        async getProductById(id) {
            return await Product.findByPk(id);
        }

        async getAllProducts() {
            return await Product.findAll({ include: "category" });
        }

        async deleteProduct(id) { 
            const product = await this.getProductById(id); 
            if (!product) { 
                throw new Error('Product not found'); 
            }
            
            return await product.destroy();
        }
        
    }


    module.exports = new ProductRepository();
