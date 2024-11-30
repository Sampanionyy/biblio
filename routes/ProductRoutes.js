const express = require("express");
const ProductService = require("../services/ProductService");
const CategoryService = require("../services/CategoryService");
const Product = require("../entities/Product");
const ProductRepository = require("../repositories/ProductRepository");
const CategoryRepository = require("../repositories/CategoryRepository");
const router = express.Router();

// Exemple de route pour afficher tous les produits
// Route principale pour afficher les produits
router.get("/", async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        const categories = await CategoryService.getAllCategories();
        res.render('layout', {
            title: 'Online Library - Products', 
            second_title: 'Products', 
            body: 'products/index', 
            categories: categories || null,
            products: products || null
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    const { name, price, categoryId } = req.body;

    try {
        // Créer un nouveau produit et l'enregistrer dans la base de données
        await Product.create({
            name: name,
            price: price,
            categoryId: categoryId
        });

        // Rediriger vers la page des produits après l'ajout
        res.redirect("/products");
    } catch (error) {
        // Gérer les erreurs, par exemple, si l'enregistrement échoue
        console.error(error);
        res.status(500).send("Une erreur est survenue lors de l'ajout du produit.");
    }
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await ProductService.deleteProduct(id);
        res.redirect("/products"); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductRepository.getProductById(id); 
        const categories = await CategoryRepository.getAllCategories();
        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render('layout', {
            title: 'Online Library - Update Product', 
            second_title: 'Update Product', 
            body: 'products/update', 
            product: product || null,
            categories: categories || null
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params; 
    const { name, price, categoryId } = req.body; 

    try {
        const product = await ProductRepository.getProductById(id); 
        if (!product) {
            return res.status(404).send("Product not found");
        }

        product.name = name;
        product.price = price;
        product.categoryId = categoryId;
        await product.save(); 

        res.redirect("/products"); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
