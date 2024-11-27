const express = require("express");
const CategoryService = require("../services/CategoryService");
const Category = require("../entities/Category");
const CategoryRepository = require("../repositories/CategoryRepository");
const router = express.Router();

// Exemple de route pour afficher toutes les catégories
router.get("/", async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.render("categories/", { categories, categories });
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).send("Server Error");
    }
});

// Exemple de route pour ajouter une catégorie
router.post("/", async (req, res) => {
    const { name } = req.body;

    try {
        // Créer une nouvelle catégorie et l'enregistrer dans la base de données
        await Category.create({
            name: name,
        });

        // Rediriger vers la page des catégories après l'ajout
        res.redirect("/categories");
    } catch (error) {
        // Gérer les erreurs, par exemple, si l'enregistrement échoue
        console.error(error);
        res.status(500).send("Une erreur est survenue lors de l'ajout de la catégorie.");
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await CategoryService.deleteCategory(id);
        res.redirect("/categories"); // Rediriger vers la liste des produits après suppression
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await CategoryRepository.getCategoryById(id); // Méthode pour obtenir la catégorie
        if (!category) {
            return res.status(404).send("Category not found");
        }
        res.render("categories/update", { category }); // Affiche le formulaire avec les données de la catégorie
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params; // Récupération de l'id depuis l'URL
    const { name } = req.body; // Récupération du champ à mettre à jour depuis le corps de la requête

    try {
        const category = await CategoryRepository.getCategoryById(id); // Méthode pour obtenir la catégorie
        if (!category) {
            return res.status(404).send("Category not found");
        }

        // Mise à jour des données de la catégorie
        category.name = name;
        await category.save(); // Sauvegarde dans la base de données

        res.redirect("/categories"); // Redirection vers la liste des catégories après mise à jour
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
