const db = require("../models");

const studentServices = {
  create: async (addModel) => {
    return await db.Student.create(
      {
        ...addModel,
        card: {
          cardNo: Math.floor(1000 + Math.random() * 9000),
          firstName: addModel?.firstName,
          lastName: addModel?.lastName,
        },
      },
      {
        include: {
          model: db.Card,
          as: "card",
        },
      }
    );
  },
  update: async (id, update) => {
    return await db.Student.update(update, {
      where: { id },
    });
  },
  delete: async (id) => {
    return await db.Student.destroy({
      where: { id },
    });
  },
  findById: async (id) => {
    return await db.Student.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: db.Card,
        as: "card",
      },
    });
  },
  findByUsername: async (_username) => {
    return await db.Student.findOne({
      where: {
        username: _username,
      },
    });
  },
};

module.exports = studentServices;
