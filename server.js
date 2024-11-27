const sequelize = require('./config/database');
const Product = require('./entities/Product');
const Category = require('./entities/Category');
const User = require('./entities/User');


(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
})();

