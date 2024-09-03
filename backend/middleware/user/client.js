const isClient = async (req, res, next) => {
  if (req.user.role !== "CLIENT")
    return res.status(403).send({ message: "Forbidden" });
  next();
};
