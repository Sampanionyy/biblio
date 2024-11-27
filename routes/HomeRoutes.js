const express = require('express');
const router = express.Router();

// Route pour afficher la page d'accueil
router.get('/home', (req, res) => {
    res.render('home', { user: req.user || null });
});

module.exports = router;
