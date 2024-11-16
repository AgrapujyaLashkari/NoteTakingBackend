// import { errorHandler } from "./error.js"
// import jwt from "jsonwebtoken"

// export const verifyToken = (req, res, next) => {
//   console.log(req)
//   const token = req.cookies.access_token
//   console.log(token)
//   console.log(req.cookies)


//   if (!token) {
//     return next(errorHandler(401, "Unauthorized"))
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(errorHandler(403, "Forbidden"))
//     }

//     req.user = user
//     next()
//   })
// }


// import { errorHandler } from "./error.js"
// import jwt from "jsonwebtoken"

// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]

//   if (!token) {
//     return next(errorHandler(401, "Unauthorized"))
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(errorHandler(403, "Forbidden"))
//     }

//     req.user = user
//     next()
//   })
// }


import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  console.log("Received token:", token); // Add this line for debugging

  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification error:", err); // Add this line for debugging
      return next(errorHandler(403, "Forbidden: Invalid token"));
    }

    req.user = user;
    next();
  });
};