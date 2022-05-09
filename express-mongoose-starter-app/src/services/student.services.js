const { studentModel, cardModel } = require("../models");

const studentServices = {
  create: async (addModel) => {
    try {
      const session = await studentModel.startSession();
      session.startTransaction();
      const createCard = await cardModel.create({
        cardNo: Math.floor(1000 + Math.random() * 9000),
        firstName: addModel?.firstName,
        lastName: addModel?.lastName,
      });
      addModel.card = createCard._id;

      const createStudent = await studentModel.create({
        ...addModel,
      });
      await session.commitTransaction();
      session.endSession();
      return createStudent;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
  update: async (id, update) => {
    return await studentModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  delete: async (id) => {
    try {
      const session = await studentModel.startSession();
      session.startTransaction();
      const cardId = await studentModel.findById(id).select({ card: 1 });
      const countStudentDelete = await studentModel.deleteMany({ _id: id });
      const countCardDelete = await cardModel.deleteOne({ _id: cardId });
      await session.commitTransaction();
      session.endSession();
      return { countStudentDelete, countCardDelete };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
  findById: async (id) => {
    return await studentModel
      .findById(id)
      .select(["-password"])
      .populate("card");
  },
  findByUsername: async (_username) => {
    return await studentModel.findOne({ username: _username });
  },
  addSubject: async (studentId, subjectId) => {
    return await studentModel.findOneAndUpdate(
      { _id: studentId },
      { $push: { subjects: subjectId } }
    );
  },
  deleteSubject: async (studentId, subjectId) => {
    return await studentModel.findOneAndUpdate(
      { _id: studentId },
      { $pull: { subjects: subjectId } }
    );
  },
  countStudentGroupBySubject: async () => {
    return await studentModel.aggregate([
      {
        $unwind: "$subjects",
      },
      {
        $group: {
          _id: "$subjects._id",
          count: { $sum: 1 },
        },
      },
    ]);
  },
};

module.exports = studentServices;
