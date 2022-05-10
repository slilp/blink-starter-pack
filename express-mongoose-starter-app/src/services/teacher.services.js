const { teacherModel, subjectModel } = require("../models");

const teacherServices = {
  create: async (addModel) => {
    return await teacherModel.create(addModel);
  },
  update: async (id, update) => {
    if (update?.subject) {
      const session = await teacherModel.startSession();
      try {
        session.startTransaction();
        await subjectModel.findOneAndUpdate(
          { _id: update?.subject },
          { $addToSet: { teachers: id } }
        );
        const response = await teacherModel.findOneAndUpdate(
          { _id: id },
          update
        );
        await session.commitTransaction();
        session.endSession();
        return response;
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    }
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
  deleteSubject: async (id) => {
    const session = await teacherModel.startSession();
    try {
      session.startTransaction();
      const response = await teacherModel.findOneAndUpdate(
        { _id: id },
        { $unset: { subject: 1 } }
      );
      await subjectModel.findOneAndUpdate(
        { _id: response.subject },
        { $pull: { teachers: id } },
        {
          new: true,
        }
      );
      await session.commitTransaction();
      session.endSession();
      return response;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
  countFindByFilter: async ({ nameFilter }) => {
    console.log(nameFilter);
    return await teacherModel
      .find(
        nameFilter
          ? {
              $or: [
                { firstName: { $regex: nameFilter, $options: "i" } },
                { lastName: { $regex: nameFilter, $options: "i" } },
              ],
            }
          : {}
      )
      .count();
  },
  findByFilter: async ({ nameFilter }, { skip, limit }) => {
    return await teacherModel
      .find(
        nameFilter
          ? {
              $or: [
                { firstName: { $regex: nameFilter, $options: "i" } },
                { lastName: { $regex: nameFilter, $options: "i" } },
              ],
            }
          : {}
      )
      .sort([["firstName", 1]])
      .skip(skip)
      .limit(limit);
  },
  countTeacherGroupBySubject: async () => {
    return await teacherModel.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          sujectId: "$_id",
          count: "$count",
        },
      },
    ]);
  },
};

module.exports = teacherServices;
