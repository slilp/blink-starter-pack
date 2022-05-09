const { teacherModel } = require("../models");

const teacherServices = {
  create: async (addModel) => {
    return await teacherModel.create(addModel);
  },
  update: async (id, update) => {
    return await teacherModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  delete: async (id) => {
    return await teacherModel.deleteOne({ _id: id });
  },
  findById: async (id) => {
    return await teacherModel.findById(id).populate("students");
  },
  countFindByFilter: async ({ nameFilter }) => {
    return await teacherModel
      .find({
        $or: [
          nameFilter
            ? {
                fistName: { $regex: nameFilter, $options: "i" },
              }
            : {},
          nameFilter
            ? {
                lastName: { $regex: nameFilter, $options: "i" },
              }
            : {},
        ],
      })
      .count();
  },
  findByFilter: async ({ nameFilter }, { skip, limit }) => {
    return await teacherModel
      .find({
        $or: [
          nameFilter
            ? {
                fistName: { $regex: nameFilter, $options: "i" },
              }
            : {},
          nameFilter
            ? {
                lastName: { $regex: nameFilter, $options: "i" },
              }
            : {},
        ],
      })
      .sort(["firstName", 1])
      .skip(skip)
      .limit(limit);
  },
  countTeacherGroupBySubject: async () => {
    return await teacherModel.aggregate([
      {
        $group: {
          _id: "$subject._id",
          count: { $sum: 1 },
        },
      },
    ]);
  },
};

module.exports = teacherServices;
