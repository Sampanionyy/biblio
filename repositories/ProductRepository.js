    const Product = require("../entities/Product");
    class ProductRepository {
        async createProduct(data) {
            return await Product.create(data);
        }

        async getAllProducts() {
            return await Product.findAll({ include: "category" });
        }
        
    }


    module.exports = new ProductRepository();
