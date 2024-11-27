const express = require("express");
const ProductService = require("../services/ProductService");
const CategoryService = require("../services/CategoryService");
const Product = require("../entities/Product");
const router = express.Router();

// Exemple de route pour afficher tous les produits
// Route principale pour afficher les produits
router.get("/", async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        const categories = await CategoryService.getAllCategories();
        res.render("products/", { products, categories });
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

module.exports = router;
