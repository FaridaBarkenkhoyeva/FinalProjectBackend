const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Database is connected successfully"))
  .catch((err) => console.log("Unable to connect to database:", err));

module.exports = sequelize;


