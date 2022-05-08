const db = require("../models");
const { Op } = require("sequelize");

const subjectServices = {
  create: async (addModel) => {
    return await db.Subject.create(addModel);
  },
  update: async (id, update) => {
    return await db.Subject.update(update, {
      where: { id },
    });
  },
  delete: async (id) => {
    return await db.Subject.destroy({
      where: { id },
    });
  },
  findById: async (id) => {
    return await db.Subject.findOne({
      where: { id },
      include: { model: db.Teacher, as: "teachers" },
    });
  },
  findByFilter: async ({ nameFilter }, { skip, limit }) => {
    console.log(nameFilter);
    return await db.Subject.findAndCountAll({
      where: nameFilter
        ? {
            name: { [Op.like]: `%${nameFilter}%` },
          }
        : {},
      offset: limit * skip,
      limit: limit,
      order: [["name", "ASC"]],
    });
  },
};

module.exports = subjectServices;
