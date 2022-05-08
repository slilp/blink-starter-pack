const express = require("express");
const router = express.Router();
const { studentControllers, cardControllers } = require("../controllers");
const { jwtAuthentication } = require("../middlewares/auth");

router.get("/", [jwtAuthentication], studentControllers.information);
router.post("/register", studentControllers.register);
router.post("/login", studentControllers.login);
router.post("/add-subject", [jwtAuthentication], studentControllers.addSubject);
router.delete(
  "/delete-subject/:id",
  [jwtAuthentication],
  studentControllers.deleteSubject
);
router.delete("/", [jwtAuthentication], studentControllers.delete);
router.put("/update-card", [jwtAuthentication], cardControllers.update);
router.put(
  "/update-subject",
  [jwtAuthentication],
  studentControllers.updateSubject
);

module.exports = router;
