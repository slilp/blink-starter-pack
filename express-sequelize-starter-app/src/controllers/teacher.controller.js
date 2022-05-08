const { teacherServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await teacherServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await teacherServices.update(req.params.id, req.body);
    if (result[0] === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ updatedCount: result[0] });
  },
  delete: async (req, res) => {
    const result = await teacherServices.delete(req.params.id);
    if (result === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ deletedCount: result });
  },
  searchByName: async (req, res) => {
    const { skip = 0, limit = 15, search } = req.query;
    const result = await teacherServices.findByFilter(
      {
        nameFilter: search,
      },
      {
        skip: +skip,
        limit: +limit,
      }
    );
    if (result === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json(result);
  },
  countTeacherBySubject: async (req, res) => {
    const result = await teacherServices.countTeacherGroupBySubject();
    return res.json(result);
  },
};
