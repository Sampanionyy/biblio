const express = require('express');
const path = require('path');
const app = express();
const Product = require('./entities/Product') ;
const Category = require('./entities/Category');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use(methodOverride('_method'));
app.listen(3000, () => console.log('Server running on port 3000'));