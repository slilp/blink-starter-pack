const db = require("../models");

const cardServices = {
  create: async (addModel) => {
    return await db.Card.create(addModel);
  },
  update: async (id, update) => {
    return await db.Card.update(update, {
      where: { student_id: id },
    });
  },
  delete: async (id) => {
    return await db.Card.destroy({
      where: { id },
    });
  },
  findById: async (id) => {
    return await db.Card.findOne({
      where: {
        id,
      },
      include: {
        model: db.Student,
        attributes: {
          exclude: ["password"],
        },
      },
    });
  },
};

module.exports = cardServices;
