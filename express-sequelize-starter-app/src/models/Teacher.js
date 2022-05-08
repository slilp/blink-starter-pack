module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Teacher",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(500),
        field: "last_name",
      },
      profileImage: {
        type: DataTypes.STRING(500),
        field: "profile_image",
      },
    },
    {
      tableName: "teacher",
      timestamps: false,
      modelName: "teacher",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Subject, {
      foreignKey: "subject_id",
      as: "subject",
    });
  };

  return model;
};
