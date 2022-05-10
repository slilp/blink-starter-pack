const { studentModel, cardModel, subjectModel } = require("../models");

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
    const cardId = await studentModel.findById(id).select({ card: 1 });
    const session = await studentModel.startSession();
    try {
      session.startTransaction();
      const countStudentDelete = await studentModel.deleteMany({ _id: id });
      const countCardDelete = await cardModel.deleteOne({ _id: cardId?.card });
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
    const session = await studentModel.startSession();
    try {
      session.startTransaction();
      await subjectModel.findOneAndUpdate(
        { _id: subjectId },
        { $addToSet: { students: studentId } },
        {
          new: true,
        }
      );
      const response = await studentModel.findOneAndUpdate(
        { _id: studentId },
        { $push: { subjects: subjectId } }
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
  deleteSubject: async (studentId, subjectId) => {
    const session = await studentModel.startSession();
    try {
      session.startTransaction();
      await subjectModel.findOneAndUpdate(
        { _id: subjectId },
        { $pull: { students: studentId } },
        {
          new: true,
        }
      );
      const response = await studentModel.findOneAndUpdate(
        { _id: studentId },
        { $pull: { subjects: subjectId } }
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
