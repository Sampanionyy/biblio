const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    console.log(req.user)
    res.render('layout', {
        title: 'Online Library - Home',
        body: 'home', 
        user: req.user || null 
    });
});

module.exports = router;
