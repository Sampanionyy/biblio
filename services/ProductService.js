const ProductRepository = require("../repositories/ProductRepository");
const ProductDTO = require("../dtos/ProductDTO");

class ProductService {
    async createProduct(name, price, categoryId) {
        const product = await ProductRepository.createProduct({
            name,
            price,
            categoryId,
        });
        return new ProductDTO(
            product.id,
            product.name,
            product.price,
            product.category
        );
    }

    async getAllProducts() {
        const products = await ProductRepository.getAllProducts();
        return products.map(
            (product) =>
                new ProductDTO(
                product.id,
                product.name,
                product.price,
                product.category
                )
            );
    }

    async deleteProduct(id) {
        const product = await ProductRepository.getProductById(id);
        if (!product) {
            throw new Error("Product not found");
        }

        try {
            await ProductRepository.deleteProduct(id);
        } catch(error) {
            console.log(error)
        }
    }
}


module.exports = new ProductService();
