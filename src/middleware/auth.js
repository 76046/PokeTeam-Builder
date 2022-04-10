import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) res.status(401).end("MissingHeaders");
    const SECRET = process.env.TOKEN_SECRET;
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET, (err) => {
      if (err) res.status(401).end("FaultyToken");
      const payload = jwt.decode(token, SECRET);
      req.roles = payload.roles;
      req.login = payload.login;
      return next();
    });
  } catch (e) {
    next(e);
  }
};

export default auth;
