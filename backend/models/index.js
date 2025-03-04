const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
});

const User = require("./User")(sequelize, DataTypes);
const Product = require("./Product")(sequelize, DataTypes);
const Pin = require("./Pin")(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  Product,
  Pin,
};
