function role(requiredRole) {
  return (req, res, next) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      req.body.role !== requiredRole
    ) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
}

module.exports = role;
