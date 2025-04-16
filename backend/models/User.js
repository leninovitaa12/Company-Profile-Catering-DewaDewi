module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
<<<<<<< HEAD
      role: {  // Tambahkan kolom role
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin", // default role admin
=======
      role: {
        type: DataTypes.ENUM("admin", "super-admin"),
        allowNull: false,
        defaultValue: "admin",
>>>>>>> c434af83c9c649cb609cd8544f3c1b762610f012
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
