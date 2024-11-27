const sequelize = require('./config/database');
const Product = require('./entities/Product');
const Category = require('./entities/Category');
const User = require('./entities/User');


sequelize.sync().then(() => {
    console.log('Database synchronized');
});
