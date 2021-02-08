const jwt = require("jsonwebtoken");

const { no_auth } = require("../../config/errors");
const { sign } = require("../../config/jwt");

module.exports = {
  generateToken: (vl) => jwt.sign(vl, process.env.SECRET, sign),

  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json(no_auth);

    jwt.verify(token, process.env.SECRET, function (err, tk) {
      if (err) return res.status(401).json({ ...no_auth, error: err });

      req.jwt = tk;
      next();
    });
  },
};
