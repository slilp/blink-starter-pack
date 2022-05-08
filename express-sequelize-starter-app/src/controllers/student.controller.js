const { studentServices, studentSubjectServices } = require("../services");
const { bcryptPassword, tokenGenerator } = require("../utils");

module.exports = {
  register: async (req, res) => {
    const user = await studentServices.findByUsername(req.body.username);
    if (user)
      return res.status(401).json({
        message: "existing username",
      });

    const pass = await bcryptPassword.hashPassword(req.body.password);

    const result = await studentServices.create({
      username: req.body.username,
      password: pass,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    result.password = null;
    return res.json(result);
  },
  login: async (req, res) => {
    let user = await studentServices.findByUsername(req.body.username);

    if (!user)
      return res.status(401).json({
        message: "invalid username or password",
      });

    const isCorrectPassword = await bcryptPassword.verifyPassword(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword)
      return res.status(400).json({
        message: "invalid username or password",
      });

    const accessToken = tokenGenerator.accessTokenGenerator(user.id);
    user.password = null;

    return res.json({
      account: user,
      token: {
        accessToken: accessToken,
        tokenType: "bearer",
        expiresIn: 3600,
      },
    });
  },
  delete: async (req, res) => {
    const countDelete = await studentServices.delete(req.user);
    return res.json({
      deleted: countDelete,
    });
  },
  update: async (req, res) => {
    const countDelete = await studentServices.update(req.user, req.body);
    if (result[0] === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ updatedCount: result[0] });
  },
  information: async (req, res) => {
    let userInfo = await studentServices.findById(req.user);
    if (userInfo) {
      return res.json(userInfo);
    }
    return res.status(404).json({ message: "NOT_FOUND" });
  },
  addSubject: async (req, res) => {
    let result = await studentSubjectServices.create({
      subject_id: req.body.subjectId,
      student_id: req.user,
    });
    return res.json(result);
  },
  updateSubject: async (req, res) => {
    let result = await studentSubjectServices.update(
      req.user,
      req.body.subjectId,
      {
        subject_id: req.body?.newSubjectId,
      }
    );
    if (result[0] === 0)
      return res.status(404).json({ message: "NOT FOUND DATA" });
    return res.json({ updatedCount: result[0] });
  },
  deleteSubject: async (req, res) => {
    const countDelete = await studentSubjectServices.delete(
      req.user,
      req.params.id
    );
    return res.json({
      deleted: countDelete,
    });
  },
};
