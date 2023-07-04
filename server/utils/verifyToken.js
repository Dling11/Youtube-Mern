import { createError } from "./error.js";
import jwt from "jsonwebtoken";

// verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token) return next(createError(401, "You are not Authenticated bitc-- I mean you... "));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if(err) return next(createError(403, "Token is not Valid, you hacker"));
    req.user = user; //important to assign to the req.user || also you can name everything you want user = rowellGod or something
    next();
  })
}