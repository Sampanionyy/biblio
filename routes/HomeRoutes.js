const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const UserRepository = require('../repositories/UserRepository');
 
router.get('/home', isAuthenticated, async (req, res) => {
    try {
        console.log(isAuthenticated); // Assure-toi que req.user est bien peuplé par le middleware
        const user = await UserRepository.getUserById(req.user.id);

        res.render('layout', {
            title: 'Online Library - Home', // Titre de la page
            body: 'home', // Indique la vue partielle à charger dans le layout (si applicable)
            user: user || null // Passe le user au template, ou null s'il est absent
        });
    } catch (err) {
        console.error('Erreur lors du rendu de /home :', err);
        res.status(500).send('Une erreur est survenue.'); // Gestion d'erreur serveur
    }
});

module.exports = router;
