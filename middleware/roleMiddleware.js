exports.authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied for this role"
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};