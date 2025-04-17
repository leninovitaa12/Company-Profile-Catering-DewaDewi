module.exports = (sequelize, DataTypes) => {
  const Testimoni = sequelize.define(
    "Testimoni",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Testimoni;
};
