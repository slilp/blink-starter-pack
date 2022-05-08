const db = require("../models");
const { Op, fn, col } = require("sequelize");

const teacherServices = {
  create: async (addModel) => {
    return await db.Teacher.create(addModel);
  },
  update: async (id, update) => {
    return await db.Teacher.update(update, {
      where: { id },
    });
  },
  delete: async (id) => {
    return await db.Teacher.destroy({
      where: { id },
    });
  },
  findById: async (id) => {
    return await db.Teacher.findOne({ where: { id }, include: db.Student });
  },
  findByFilter: async ({ nameFilter }, { skip, limit }) => {
    return await db.Teacher.findAndCountAll({
      where: nameFilter
        ? {
            [Op.or]: [
              {
                firstName: { [Op.like]: `%${nameFilter}%` },
              },
              {
                lastName: { [Op.like]: `%${nameFilter}%` },
              },
            ],
          }
        : {},
      offset: limit * skip,
      limit: limit,
      order: [["firstName", "DESC"]],
    });
  },
  countTeacherGroupBySubject: async () => {
    return await db.Teacher.findAll({
      group: "subject_id",
      attributes: [
        ["subject_id", "subjectId"],
        [fn("COUNT", col("subject_id")), "countTeacher"],
      ],
      include: {
        model: db.Subject,
        as: "subject",
      },
    });
  },
};

module.exports = teacherServices;
