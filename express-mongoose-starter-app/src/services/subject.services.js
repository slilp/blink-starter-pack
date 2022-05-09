const { subjectModel } = require("../models");

const subjectServices = {
  create: async (addModel) => {
    return await subjectModel.create(addModel);
  },
  update: async (id, update) => {
    return await subjectModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  delete: async (id) => {
    return await subjectModel.deleteOne({ _id: id });
  },
  findById: async (id) => {
    return await subjectModel.findById(id).populate("teachers");
  },
  countFindByFilter: async ({ nameFilter }) => {
    return await subjectModel
      .find(
        nameFilter
          ? {
              name: { $regex: nameFilter, $options: "i" },
            }
          : {}
      )
      .count();
  },
  findByFilter: async ({ nameFilter }, { skip, limit }) => {
    return await subjectModel
      .find(
        nameFilter
          ? {
              name: { $regex: nameFilter, $options: "i" },
            }
          : {}
      )
      .sort(["name", 1])
      .skip(skip)
      .limit(limit);
  },
};

module.exports = subjectServices;
