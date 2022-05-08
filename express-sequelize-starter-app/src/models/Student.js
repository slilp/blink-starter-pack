module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(500),
      },
      firstName: {
        type: DataTypes.STRING(100),
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(100),
        field: "last_name",
      },
    },
    {
      tableName: "student",
      timestamps: false,
      modelName: "student",
    }
  );

  model.associate = (models) => {
    model.hasOne(models.Card, {
      as: "card",
      foreignKey: "student_id",
    });
    model.belongsToMany(models.Subject, {
      through: models.StudentSubject,
      as: "subjects",
      foreignKey: "student_id",
    });
  };

  return model;
};
