const { teacherServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await teacherServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await teacherServices.update(req.params.id, req.body);
    return res.json(result);
  },
  deleteSubject: async (req, res) => {
    const result = await teacherServices.deleteSubject(req.params.id);
    return res.json(result);
  },
  delete: async (req, res) => {
    const result = await teacherServices.delete(req.params.id);
    if (result === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ deletedCount: result });
  },
  searchByName: async (req, res) => {
    const { skip = 0, limit = 15, search } = req.query;
    const totalCount = await teacherServices.countFindByFilter({
      nameFilter: search,
    });
    if (totalCount === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });

    const result = await teacherServices.findByFilter(
      {
        nameFilter: search,
      },
      {
        skip: +skip,
        limit: +limit,
      }
    );
    return res.json({ result, totalCount });
  },
  countTeacherBySubject: async (req, res) => {
    const result = await teacherServices.countTeacherGroupBySubject();
    return res.json(result);
  },
};
