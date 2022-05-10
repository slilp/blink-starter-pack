const { cardServices } = require("../services");

module.exports = {
  update: async (req, res) => {
    const result = await cardServices.update(req.user, req.body);
    return res.json(result);
  },
};
