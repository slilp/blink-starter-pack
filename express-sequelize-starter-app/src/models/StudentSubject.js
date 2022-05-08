module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "StudentSubject",
    {
      grade: {
        type: DataTypes.ENUM("A", "B", "C", "D", "F"),
      },
    },
    {
      tableName: "student_subject",
      timestamps: false,
    }
  );

  return model;
};
