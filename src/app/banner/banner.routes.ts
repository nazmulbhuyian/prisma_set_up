import express from "express";
import { findAllBanner, postBanner } from "./banner.controllers";
const router = express.Router();

// Create, Get Banner
router
  .route("/")
  .get(findAllBanner)
  .post(postBanner);

export const BannerRoutes = router;



// import { Prisma } from "@prisma/client";
// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";
// import ApiError from "../errors/ApiError";

// const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
//   let success = false;
//   let message = err.message || "Something went wrong!";
//   let errorMessages: { path: string; message: string }[] = [];

  // // Handle custom ApiError
  // if (err instanceof ApiError) {
  //   message = err.message;
  //   statusCode = err.statusCode;
  //   errorMessages.push({
  //     path: "",
  //     message: err.message,
  //   });
  // }

  // // Handle regular errors like `new Error()`
  // else if (err instanceof Error) {
  //   message = err.message;
  //   statusCode = httpStatus.BAD_REQUEST;  // You can adjust the status code here if needed
  //   errorMessages.push({
  //     path: "",
  //     message: err.message,
  //   });
  // }

//   // Prisma Validation Error (e.g. missing required field)
//   else if (err instanceof Prisma.PrismaClientValidationError) {
//     message = "Validation Error";
//     statusCode = httpStatus.BAD_REQUEST;

//     // Match "Argument `title` is missing."
//     const match = err.message.match(/Argument `(\w+)` is missing/);
//     if (match) {
//       const missingField = match[1];
//       errorMessages.push({
//         path: missingField,
//         message: `Path ${missingField} is required.`,
//       });
//     } else {
//       errorMessages.push({
//         path: "",
//         message: "Invalid data format sent to database.",
//       });
//     }
//   }

//   // Prisma Unique Constraint Error
//   else if (err instanceof Prisma.PrismaClientKnownRequestError) {
//     if (err.code === "P2002") {
//       message = "Duplicate Field Error";
//       const target = Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : "unknown field";
//       errorMessages.push({
//         path: target,
//         message: `Duplicate value for unique field(s): ${target}`,
//       });
//       statusCode = httpStatus.CONFLICT;
//     }
//   }

//   // Default fallback
//   if (errorMessages.length === 0) {
//     errorMessages.push({
//       path: "",
//       message: "Unexpected error occurred",
//     });
//   }

//   res.status(statusCode).json({
//     success,
//     message,
//     errorMessages,
//   });
// };

// export default globalErrorHandler;
