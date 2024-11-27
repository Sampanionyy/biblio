const express = require('express');
const path = require('path');
const app = express();
const Product = require('./entities/Product') ;
const Category = require('./entities/Category');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const authRoutes = require('./routes/auth');
const methodOverride = require('method-override');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cookieParser());
app.use(csrf({ cookie: true })); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // Ajoute csrfToken à res.locals
    next();
});
app.use('/auth', authRoutes);
app.use(methodOverride('_method'));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});