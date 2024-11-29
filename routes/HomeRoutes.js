const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const UserRepository = require('../repositories/UserRepository');
 
router.get('/home', isAuthenticated, async (req, res) => {
    try {
        const user = await UserRepository.getUserById(req.user.id);

        res.render('layout', {
            title: 'Online Library - Home', 
            body: 'home', 
            user: user || null 
        });
    } catch (err) {
        console.error('Erreur lors du rendu de /home :', err);
        res.status(500).send('Une erreur est survenue.'); // Gestion d'erreur serveur
    }
});

module.exports = router;
