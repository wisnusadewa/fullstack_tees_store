const isAdmin = async (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).send({ message: "Forbidden" });
  next();
};

module.exports = { isAdmin };
