const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
});

const User = require("./User")(sequelize, DataTypes);
const Product = require("./Product")(sequelize, DataTypes);
const Pin = require("./Pin")(sequelize, DataTypes);
const Testimoni = require("./Testimoni")(sequelize, DataTypes);
const Profile = require("./Profile")(sequelize, DataTypes);

User.hasMany(Pin, {
  foreignKey: "email",
  sourceKey: "email",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Pin.belongsTo(User, {
  foreignKey: "email",
  targetKey: "email",
});

module.exports = {
  sequelize,
  User,
  Product,
  Pin,
  Testimoni,
  Profile,
};
