const { subjectServices, studentSubjectServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await subjectServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await subjectServices.update(req.params.id, req.body);
    if (result[0] === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ updatedCount: result[0] });
  },
  delete: async (req, res) => {
    const result = await subjectServices.delete(req.params.id);
    if (result === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ deletedCount: result });
  },
  information: async (req, res) => {
    const result = await subjectServices.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json(result);
  },
  searchByName: async (req, res) => {
    const { skip = 0, limit = 15, search } = req.query;
    const result = await subjectServices.findByFilter(
      {
        nameFilter: search,
      },
      {
        skip: +skip,
        limit: +limit,
      }
    );
    if (!result) return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json(result);
  },
  countStudentBySubject: async (req, res) => {
    const result = await studentSubjectServices.countStudentGroupBySubject();
    return res.json(result);
  },
  updateGradeOfStudent: async (req, res) => {
    let result = await studentSubjectServices.update(
      req.body.studentId,
      req.body.subjectId,
      {
        grade: req.body.grade,
      }
    );
    if (result[0] === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ updatedCount: result[0] });
  },
};
