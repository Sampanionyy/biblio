const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const jwt = require('jsonwebtoken'); // Assure-toi d'avoir importé jwt
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const authRoutes = require('./routes/auth');
const HomeRoutes = require('./routes/HomeRoutes');
const UserRepository = require('./repositories/UserRepository');

const PORT = process.env.PORT || 3000;

// Middleware to authenticate user from JWT
const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return next(); // If no token, proceed without user
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user in req.user
        next();
    } catch (err) {
        res.clearCookie('jwt'); // Clear the cookie if token is invalid
        next();
    }
};

// Middleware order is crucial for CSRF protection
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Authenticate user middleware BEFORE route definitions
app.use(authenticateUser);

// CSRF token middleware AFTER csrf protection is set up
app.use(async (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.user = await UserRepository.getUserById(req.user.id);
    console.log(res.locals.user)
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);
app.use('/', HomeRoutes);
app.use(methodOverride('_method'));

// Error handler for CSRF token errors
app.use((err, req, res, next) => {
    console.log('err ' + err);
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).send('Form tampered with');
});

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
})();
