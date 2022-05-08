const db = require("../models");
const { fn, col } = require("sequelize");

const studentSubjectServices = {
  create: async (addModel) => {
    return await db.StudentSubject.create(addModel);
  },
  update: async (studentId, subjectId, update) => {
    return await db.StudentSubject.update(update, {
      where: { subject_id: subjectId, student_id: studentId },
    });
  },
  delete: async (studentId, subjectId) => {
    return await db.StudentSubject.destroy({
      where: { subject_id: subjectId, student_id: studentId },
    });
  },
  findById: async (id) => {
    return await db.StudentSubject.findOne({
      where: { id },
      include: { model: db.Teacher, include: db.Subject },
    });
  },
  countStudentGroupBySubject: async () => {
    return await db.StudentSubject.findAll({
      group: "subject_id",
      attributes: [
        ["subject_id", "subjectId"],
        [fn("COUNT", col("student_id")), "countStudent"],
      ],
    });
  },
};

module.exports = studentSubjectServices;
