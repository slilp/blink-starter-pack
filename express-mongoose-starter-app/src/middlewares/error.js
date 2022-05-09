const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
};

const logErrors = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

module.exports = { logErrors, errorHandler };
