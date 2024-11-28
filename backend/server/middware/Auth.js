const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Set the entire decoded token as req.user
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
}

// Middleware function to check if user is an admin
function isAdminToken(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Insufficient privileges. Admin access required." });
    }
  });
}

module.exports = { verifyToken, isAdminToken };
