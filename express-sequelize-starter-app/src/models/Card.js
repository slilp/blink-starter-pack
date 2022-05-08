module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Card",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      cardNo: {
        type: DataTypes.STRING(12),
        unique: true,
        field: "card_no",
      },
      firstName: {
        type: DataTypes.STRING(100),
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(100),
        field: "last_name",
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
      },
      profileImage: {
        type: DataTypes.STRING(500),
        field: "profile_image",
      },
      level: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "card",
      timestamps: false,
      modelName: "card",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Student, {
      foreignKey: "student_id",
      onDelete: "CASCADE",
    });
  };

  return model;
};
