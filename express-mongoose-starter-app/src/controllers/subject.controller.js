const { subjectServices, studentServices } = require("../services");

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
    const totalCount = await subjectServices.countFindByFilter({
      nameFilter: search,
    });
    if (totalCount === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });

    const result = await subjectServices.findByFilter(
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
  countStudentBySubject: async (req, res) => {
    const result = await studentServices.countStudentGroupBySubject();
    return res.json(result);
  },
};
