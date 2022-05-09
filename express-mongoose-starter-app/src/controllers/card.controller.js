const { cardServices } = require("../services");

module.exports = {
  update: async (req, res) => {
    const result = await cardServices.update(req.user, req.body);
    if (result[0] === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ updatedCount: result[0] });
  },
};
