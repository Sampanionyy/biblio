const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("archijs", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Tester la connexion
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Synchroniser la base de données
sequelize.sync({ force: true }).then(() => {
  console.log("Database synchronized");
});

module.exports = sequelize;
