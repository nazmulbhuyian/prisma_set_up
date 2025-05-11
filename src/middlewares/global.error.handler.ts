import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let errorMessages: { path: string; message: string }[] = [];

  // Prisma Validation Error (e.g. missing required field)
  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    statusCode = httpStatus.BAD_REQUEST;

    // Split the error message and match multiple "Argument `title` is missing."
    const matches = err.message.matchAll(/Argument `(\w+)` is missing/g);

    // Iterate over all matches and create error messages for each missing field
    for (const match of matches) {
      const missingField = match[1];
      errorMessages.push({
        path: missingField,
        message: `Path ${missingField} is required.`,
      });
    }

    // If no matches found, push a default error message
    if (errorMessages.length === 0) {
      errorMessages.push({
        path: "",
        message: "Invalid data format sent to database.",
      });
    }
  }

  // Prisma Unique Constraint Error (P2002 - Duplicate values)
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Duplicate Field Error";

      // Handling multiple fields in the unique constraint error
      const targets = Array.isArray(err.meta?.target)
        ? err.meta.target
        : [err.meta?.target];
      targets.forEach((target) => {
        errorMessages.push({
          path: Array.isArray(target) ? target.join(", ") : target,
          message: `Duplicate value for unique field(s): ${
            Array.isArray(target) ? target.join(", ") : target
          }`,
        });
      });

      statusCode = httpStatus.CONFLICT;
    }
  }

  // Handle custom ApiError
  else if (err instanceof ApiError) {
    message = err.message;
    statusCode = err.statusCode;
    errorMessages.push({
      path: "",
      message: err.message,
    });
  }

  // Handle regular errors like `new Error()`
  else if (err instanceof Error) {
    message = err.message;
    statusCode = httpStatus.BAD_REQUEST; // You can adjust the status code here if needed
    errorMessages.push({
      path: "",
      message: err.message,
    });
  }

  // Default fallback
  if (errorMessages.length === 0) {
    errorMessages.push({
      path: "",
      message: "Unexpected error occurred",
    });
  }

  res.status(statusCode).json({
    success,
    message,
    errorMessages,
  });
};

export default globalErrorHandler;
