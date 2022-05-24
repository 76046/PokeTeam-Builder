import jwt from "jsonwebtoken";

const authEngine = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const SECRET = process.env.TOKEN_SECRET;
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, SECRET, (err) => {
        if (err) return res.status(401).end("FaultyToken");
        const payload = jwt.decode(token, SECRET);
        req.roles = payload.roles;
        req.email = payload.email;
        return next();
      });
    } else {
      return next();
    }
  } catch (e) {
    next(e);
  }
};

export default authEngine;
