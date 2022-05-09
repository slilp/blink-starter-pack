const { cardModel, studentModel } = require("../models");

const cardServices = {
  update: async (id, update) => {
    const studentInfo = await await studentModel.findById(id);
    return await cardModel.findOneAndUpdate({ _id: studentInfo.card }, update, {
      new: true,
    });
  },
};

module.exports = cardServices;
