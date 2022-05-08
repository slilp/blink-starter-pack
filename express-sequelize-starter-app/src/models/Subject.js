module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Subject",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      credit: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "subject",
      timestamps: false,
      modelName: "subject",
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Teacher, {
      foreignKey: "subject_id",
      onDelete: "CASCADE",
      as: "teachers",
    });
    model.belongsToMany(models.Student, {
      through: models.StudentSubject,
      as: "students",
      foreignKey: "subject_id",
    });
  };

  return model;
};
