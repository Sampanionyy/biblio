const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const User = require('./entities/User');
const Product = require('./entities/Product');
const Category = require('./entities/Category');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const authRoutes = require('./routes/auth');
const HomeRoutes = require('./routes/HomeRoutes');

const PORT = process.env.PORT || 3000;

// Middleware order is crucial for CSRF protection
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// CSRF token middleware AFTER csrf protection is set up
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
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
    console.log('err '+err);
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).send('Form tampered with');
});

// Synchronisation de la BDD à chaque démarrage
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