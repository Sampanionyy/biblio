const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    console.log(req.user);
    const token = req.cookies.jwt;
    if (!token) return res.status(403).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Unauthorized' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    next();
};

module.exports = { isAuthenticated, isAdmin };
