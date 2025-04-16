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
      role: {  // Tambahkan kolom role
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin", // default role admin
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
