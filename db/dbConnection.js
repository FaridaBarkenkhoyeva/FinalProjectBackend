const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/db/database.sqlite",
  logging: false,
});

sequelize.sync();

module.exports = sequelize;
